import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { db } from '../config/firebase-config';
  import { CreateBookingDto } from './dto/create-booking.dto';
  import { ProcessPaymentDto } from './dto/process-payment.dto';
  import { StripePaymentService } from 'src/shared/stripe/stripe-service';
  import { getFullName } from 'src/shared/utils/naming.utils';
  import * as moment from 'moment';
  
  @Injectable()
  export class BookingService {
    private bookingsCollection = db.collection('bookings');
  
    constructor(private readonly stripeService: StripePaymentService) {}
  
    async createBooking(createBookingDto: CreateBookingDto) {
      const { toolId, userId, startDate, endDate } = createBookingDto;
  
      // Validate tool
      const toolDoc = await db.collection('tools').doc(toolId).get();
      if (!toolDoc.exists) {
        throw new NotFoundException('Tool not found');
      }
  
      const toolData = toolDoc.data();
      const amount = this.calculateBookingAmount(toolData, startDate, endDate);
  
      // Create a new booking document
      const bookingRef = this.bookingsCollection.doc();
      const bookingData = {
        toolId,
        userId,
        startDate,
        endDate,
        amount,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
  
      await bookingRef.set(bookingData);
      return { id: bookingRef.id, ...bookingData };
    }
  
    async processPayment(processPaymentDto: ProcessPaymentDto) {
      const { bookingId, paymentMethodId, currency } = processPaymentDto;
  
      const bookingDoc = await this.bookingsCollection.doc(bookingId).get();
      if (!bookingDoc.exists) {
        throw new NotFoundException('Booking not found');
      }
  
      const booking = bookingDoc.data();
      let customerId = booking.customerId;
      if (!customerId) {
        const userDoc = await db.collection('users').doc(booking.userId).get();
        if (!userDoc.exists) {
          throw new NotFoundException('User not found');
        }
        const user = userDoc.data();
        const name = getFullName(user.firstName, user.lastName);
        customerId = await this.stripeService.createStripeCustomer(user.email, name);
        await bookingDoc.ref.update({ customerId });
      }
  
      try {
        // Create or retrieve the PaymentIntent
        const amount = Math.round(booking.amount * 100); // Stripe amount is in cents
        const paymentIntent = await this.stripeService.createPaymentIntent(
          amount,
          currency,
          paymentMethodId,
          customerId,
        );
  
        // Check the PaymentIntent status
        if (paymentIntent.status === 'requires_confirmation') {
          // Confirm the PaymentIntent
          const confirmedPaymentIntent = await this.stripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
  
          // Check if the confirmation succeeded
          if (confirmedPaymentIntent.status === 'succeeded') {
            await bookingDoc.ref.update({ status: 'paid', paymentIntentId: confirmedPaymentIntent.id });
            return { success: true, paymentIntentId: confirmedPaymentIntent.id };
          } else if (confirmedPaymentIntent.status === "requires_action") {
            return { requiresAction: true, clientSecret: confirmedPaymentIntent.client_secret };
          } else {
            throw new BadRequestException('Payment failed');
          }
        } else if (paymentIntent.status === 'succeeded') {
          // Payment already succeeded
          await bookingDoc.ref.update({ status: 'paid', paymentIntentId: paymentIntent.id });
          return { success: true, paymentIntentId: paymentIntent.id };
        } else {
          throw new BadRequestException('Unexpected PaymentIntent status');
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
  
    calculateBookingAmount(toolData: any, startDate: string, endDate: string): number {
      const start = moment(startDate);
      const end = moment(endDate);
      const duration = moment.duration(end.diff(start));
      const days = duration.asDays();
  
      let amount = 0;
      const daysInMonth = moment().daysInMonth();
      const daysInWeek = 7;
  
      if (days <= daysInWeek && toolData.priceDaily) {
        amount = days * parseFloat(toolData.priceDaily);
      } else if (days <= daysInMonth && toolData.priceWeekly) {
        const weeks = Math.ceil(days / 7);
        amount = weeks * parseFloat(toolData.priceWeekly);
      } else if (toolData.priceMonthly) {
        const months = Math.ceil(days / 30);
        amount = months * parseFloat(toolData.priceMonthly);
      }
  
      return amount;
    }
  }
  