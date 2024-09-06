import Stripe from 'stripe';
export declare class StripePaymentService {
    private stripe;
    constructor();
    createStripeCustomer(email: string, name: string): Promise<Stripe.Customer>;
    createPaymentIntent(amount: number, currency: string, paymentMethodId?: string, customerId?: string): Promise<Stripe.PaymentIntent>;
    retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    confirmPaymentIntent(paymentIntentId: string, paymentMethodId?: string): Promise<Stripe.PaymentIntent>;
    cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
    refundPayment(paymentIntentId: string, amount?: number): Promise<Stripe.Refund>;
}
