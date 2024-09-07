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
const firebase_config_1 = require("../config/firebase-config");
const stripe_service_1 = require("../shared/stripe/stripe-service");
const naming_utils_1 = require("../shared/utils/naming.utils");
const moment = require("moment");
let BookingService = class BookingService {
    constructor(stripeService) {
        this.stripeService = stripeService;
        this.bookingsCollection = firebase_config_1.db.collection('bookings');
    }
    async createBooking(createBookingDto) {
        const { toolId, userId, startDate, endDate } = createBookingDto;
        const toolDoc = await firebase_config_1.db.collection('tools').doc(toolId).get();
        if (!toolDoc.exists) {
            throw new common_1.NotFoundException('Tool not found');
        }
        const toolData = toolDoc.data();
        const amount = this.calculateBookingAmount(toolData, startDate, endDate);
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
    async processPayment(processPaymentDto) {
        const { bookingId, paymentMethodId, currency } = processPaymentDto;
        const bookingDoc = await this.bookingsCollection.doc(bookingId).get();
        if (!bookingDoc.exists) {
            throw new common_1.NotFoundException('Booking not found');
        }
        const booking = bookingDoc.data();
        let customerId = booking.customerId;
        if (!customerId) {
            const userDoc = await firebase_config_1.db.collection('users').doc(booking.userId).get();
            if (!userDoc.exists) {
                throw new common_1.NotFoundException('User not found');
            }
            const user = userDoc.data();
            const name = (0, naming_utils_1.getFullName)(user.firstName, user.lastName);
            customerId = await this.stripeService.createStripeCustomer(user.email, name);
            await bookingDoc.ref.update({ customerId });
        }
        try {
            const amount = Math.round(booking.amount * 100);
            const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency, paymentMethodId, customerId);
            if (paymentIntent.status === 'requires_confirmation') {
                const confirmedPaymentIntent = await this.stripeService.confirmPaymentIntent(paymentIntent.id, paymentMethodId);
                if (confirmedPaymentIntent.status === 'succeeded') {
                    await bookingDoc.ref.update({ status: 'paid', paymentIntentId: confirmedPaymentIntent.id });
                    return { success: true, paymentIntentId: confirmedPaymentIntent.id };
                }
                else if (confirmedPaymentIntent.status === "requires_action") {
                    return { requiresAction: true, clientSecret: confirmedPaymentIntent.client_secret };
                }
                else {
                    throw new common_1.BadRequestException('Payment failed');
                }
            }
            else if (paymentIntent.status === 'succeeded') {
                await bookingDoc.ref.update({ status: 'paid', paymentIntentId: paymentIntent.id });
                return { success: true, paymentIntentId: paymentIntent.id };
            }
            else {
                throw new common_1.BadRequestException('Unexpected PaymentIntent status');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    calculateBookingAmount(toolData, startDate, endDate) {
        const start = moment(startDate);
        const end = moment(endDate);
        const duration = moment.duration(end.diff(start));
        const days = duration.asDays();
        let amount = 0;
        const daysInMonth = moment().daysInMonth();
        const daysInWeek = 7;
        if (days <= daysInWeek && toolData.priceDaily) {
            amount = days * parseFloat(toolData.priceDaily);
        }
        else if (days <= daysInMonth && toolData.priceWeekly) {
            const weeks = Math.ceil(days / 7);
            amount = weeks * parseFloat(toolData.priceWeekly);
        }
        else if (toolData.priceMonthly) {
            const months = Math.ceil(days / 30);
            amount = months * parseFloat(toolData.priceMonthly);
        }
        return amount;
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [stripe_service_1.StripePaymentService])
], BookingService);
//# sourceMappingURL=booking.service.js.map