"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripePaymentService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = require("stripe");
const dotenv = require("dotenv");
dotenv.config();
let StripePaymentService = class StripePaymentService {
    constructor() {
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20',
        });
    }
    async createStripeCustomer(email, name) {
        try {
            console.log("creating customer");
            return await this.stripe.customers.create({
                email,
                name,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create Stripe customer');
        }
    }
    async createPaymentIntent(amount, currency, paymentMethodId, customerId) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            customer: customerId,
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        });
    }
    async retrievePaymentIntent(paymentIntentId) {
        return this.stripe.paymentIntents.retrieve(paymentIntentId);
    }
    async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
        return this.stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });
    }
    async cancelPaymentIntent(paymentIntentId) {
        return this.stripe.paymentIntents.cancel(paymentIntentId);
    }
    async refundPayment(paymentIntentId, amount) {
        const paymentIntent = await this.retrievePaymentIntent(paymentIntentId);
        return this.stripe.refunds.create({
            payment_intent: paymentIntent.id,
            amount,
        });
    }
};
exports.StripePaymentService = StripePaymentService;
exports.StripePaymentService = StripePaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StripePaymentService);
//# sourceMappingURL=stripe-service.js.map