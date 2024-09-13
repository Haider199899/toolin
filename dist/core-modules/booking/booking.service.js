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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase-config");
const stripe_service_1 = require("../../shared/stripe/stripe-service");
const moment = require("moment");
const user_service_1 = require("../user/user.service");
const tool_service_1 = require("../tool/tool.service");
let BookingService = class BookingService {
    constructor(stripeService, userService, toolService) {
        this.stripeService = stripeService;
        this.userService = userService;
        this.toolService = toolService;
        this.bookingsCollection = firebase_config_1.db.collection('bookings');
        this.ordersCollection = firebase_config_1.db.collection('orders');
    }
    async processPayment(processPaymentDto) {
        const { orders, paymentMethodId, currency } = processPaymentDto;
        let totalAmount = 0;
        const bookingDetails = [];
        for (const { orderId, quantity } of orders) {
            const orderDoc = await this.ordersCollection.doc(orderId).get();
            if (!orderDoc.exists) {
                throw new common_1.NotFoundException(`Order not found: ${orderId}`);
            }
            const orderData = orderDoc.data();
            const priceBreakdown = orderData.priceBreakdown;
            const orderTotalPrice = this.calculateOrderTotal(priceBreakdown, quantity);
            totalAmount += orderTotalPrice;
            bookingDetails.push({
                orderId,
                quantity,
                totalPrice: orderTotalPrice,
            });
        }
        const customerId = await this.stripeService.createStripeCustomer('khan@gmail.com', 'haider123');
        try {
            const amountInCents = Math.round(totalAmount * 100);
            const paymentIntent = await this.stripeService.createPaymentIntent(amountInCents, currency, paymentMethodId, customerId);
            let confirmedPaymentIntent;
            if (paymentIntent.status === 'requires_confirmation') {
                confirmedPaymentIntent = await this.stripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
            }
            else {
                confirmedPaymentIntent = paymentIntent;
            }
            if (confirmedPaymentIntent.status === 'succeeded') {
                const orderIds = bookingDetails.map((detail) => detail.orderId);
                await this.updateOrderStatuses(orderIds, 'paid');
                const renterId = '085B5vG1JgMW7azpkxRkYTSSqkY2';
                const bookingDocRef = await this.bookingsCollection.add({
                    renterId,
                    orders: bookingDetails,
                    totalAmount,
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
            }
            else if (confirmedPaymentIntent.status === 'requires_action') {
                return {
                    requiresAction: true,
                    clientSecret: confirmedPaymentIntent.client_secret,
                };
            }
            else {
                throw new common_1.BadRequestException('Payment failed');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    calculateOrderTotal(priceBreakdown, quantity) {
        const { dailyBase, rentalLength, insurance, service, tax } = priceBreakdown;
        const basePrice = dailyBase * rentalLength;
        const totalOrderPrice = (basePrice + insurance + service + tax) * quantity;
        return totalOrderPrice;
    }
    async updateOrderStatuses(orderIds, status) {
        const batch = firebase_config_1.db.batch();
        for (const orderId of orderIds) {
            const orderRef = this.ordersCollection.doc(orderId);
            batch.update(orderRef, { status, updatedOn: new Date() });
        }
        await batch.commit();
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stripe_service_1.StripePaymentService,
        user_service_1.UserService,
        tool_service_1.ToolService])
], BookingService);
//# sourceMappingURL=booking.service.js.map