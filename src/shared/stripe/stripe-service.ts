import {  Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class StripePaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }
  async createStripeCustomer(email: string, name: string) {
    // Step 1: Check if a customer with the given email already exists
    const customers = await this.stripe.customers.list({
      email: email,
      limit: 1,
    });
  
    // Step 2: If a customer exists, return the existing customer ID
    if (customers.data.length > 0) {
      return customers.data[0].id; // Return existing customer's ID
    }
  
    // Step 3: If no customer exists, create a new one
    const customer = await this.stripe.customers.create({
      email,
      name,
    });
  
    return customer.id;
  }

  // Create a payment intent
  async createPaymentIntent(
    amount: number,
    currency: string,
    paymentMethodId?: string,
    customerId?: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      customer: customerId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
  }

  // Retrieve a payment intent by ID
  async retrievePaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  // Confirm a payment intent
  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId?: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });
  }

  // Cancel a payment intent
  async cancelPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.PaymentIntent> {
    return this.stripe.paymentIntents.cancel(paymentIntentId);
  }

  // Refund a payment
  async refundPayment(
    paymentIntentId: string,
    amount?: number,
  ): Promise<Stripe.Refund> {
    const paymentIntent = await this.retrievePaymentIntent(paymentIntentId);
    return this.stripe.refunds.create({
      payment_intent: paymentIntent.id,
      amount,
    });
  }
}
