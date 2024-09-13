import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { db } from '../../config/firebase-config';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { StripePaymentService } from 'src/shared/stripe/stripe-service';
import * as moment from 'moment';
import { UserService } from '../user/user.service';
import { ToolService } from '../tool/tool.service';
import { PriceBreakdownDto } from '../order/dto/create-order.dto';

@Injectable()
export class BookingService {
  private bookingsCollection = db.collection('bookings');
  private ordersCollection = db.collection('orders');

  constructor(
    private readonly stripeService: StripePaymentService,
    private readonly userService: UserService,
    private readonly toolService: ToolService,
  ) {}

  async processPayment(processPaymentDto: ProcessPaymentDto) {
    const { orders, paymentMethodId, currency } =
      processPaymentDto;

    const bookingDetails = [];

    // Loop through each order to calculate the total amount based on quantity and price breakdown
    for (const { orderId, quantity } of orders) {
      const orderDoc = await this.ordersCollection.doc(orderId).get();

      if (!orderDoc.exists) {
        throw new NotFoundException(`Order not found: ${orderId}`);
      }

      if (!processPaymentDto.totalAmount) {
        const total = orders.reduce((acc, curr) => {
          acc += curr.price * curr.quantity;
          return acc;
        }, 0);
        processPaymentDto.totalAmount = total
      }

      // const orderData = orderDoc.data();
      // =============== Calculation for order amount
      // const priceBreakdown = orderData.priceBreakdown;

      // // // Calculate total for each order
      // // const orderTotalPrice = this.calculateOrderTotal(priceBreakdown, quantity);
      // // totalAmount += orderTotalPrice;

      // Store each order detail in the booking details array
      // ===============================================

      bookingDetails.push({
        orderId,
        quantity,
        totalPrice: processPaymentDto.totalAmount,
      });
    }

    // Create the Stripe customer if not already existing
    const customerId = await this.stripeService.createStripeCustomer(
      'khan@gmail.com',
      'haider123',
    );

    try {
      // Stripe amount is in cents
      const amountInCents = Math.round(processPaymentDto.totalAmount * 100);

      // Create or retrieve the PaymentIntent
      const paymentIntent = await this.stripeService.createPaymentIntent(
        amountInCents,
        currency,
        paymentMethodId,
        customerId,
      );

      // Confirm or process the payment
      let confirmedPaymentIntent;

      if (paymentIntent.status === 'requires_confirmation') {
        confirmedPaymentIntent = await this.stripeService.confirmPaymentIntent(
          paymentIntent.id,
          paymentMethodId,
        );
      } else {
        confirmedPaymentIntent = paymentIntent;
      }

      // Handle the payment result
      if (confirmedPaymentIntent.status === 'succeeded') {
        // Update the order statuses to 'paid'
        const orderIds = bookingDetails.map((detail) => detail.orderId);
        await this.updateOrderStatuses(orderIds, 'paid');

        // Save the booking details in the bookings collection
        const renterId = '085B5vG1JgMW7azpkxRkYTSSqkY2'; // Example renter ID
        const bookingDocRef = await this.bookingsCollection.add({
          renterId,
          orders: bookingDetails, // Storing order details including orderId, quantity, total price
          totalAmount: processPaymentDto.totalAmount,
          paymentIntentId: confirmedPaymentIntent.id,
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
        });
        const bookingId = bookingDocRef.id;

        return {
          success: true,
          bookingId,
          paymentIntentId: confirmedPaymentIntent.id,
          orders: bookingDetails,
          renterId,
          createdAt: moment().toISOString(),
          updatedAt: moment().toISOString(),
        };
      } else if (confirmedPaymentIntent.status === 'requires_action') {
        return {
          requiresAction: true,
          clientSecret: confirmedPaymentIntent.client_secret,
        };
      } else {
        throw new BadRequestException('Payment failed');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Function to calculate the total for an order based on price breakdown and quantity
  private calculateOrderTotal(
    priceBreakdown: PriceBreakdownDto,
    quantity: number,
  ): number {
    const { dailyBase, rentalLength, insurance, service, tax } = priceBreakdown;

    // Calculate the total base price for the entire rental period
    const basePrice = dailyBase * rentalLength;
    const totalOrderPrice = (basePrice + insurance + service + tax) * quantity;

    return totalOrderPrice;
  }

  private async updateOrderStatuses(orderIds: string[], status: string) {
    const batch = db.batch();

    for (const orderId of orderIds) {
      const orderRef = this.ordersCollection.doc(orderId);
      batch.update(orderRef, { status, updatedOn: new Date() });
    }

    await batch.commit();
  }
}
