import { CreateBookingDto } from './dto/create-booking.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { StripePaymentService } from 'src/shared/stripe/stripe-service';
export declare class BookingService {
    private readonly stripeService;
    private bookingsCollection;
    constructor(stripeService: StripePaymentService);
    createBooking(createBookingDto: CreateBookingDto): Promise<{
        toolId: string;
        userId: string;
        startDate: string;
        endDate: string;
        amount: number;
        status: string;
        createdAt: string;
        id: string;
    }>;
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<{
        success: boolean;
        paymentIntentId: string;
        requiresAction?: undefined;
        clientSecret?: undefined;
    } | {
        requiresAction: boolean;
        clientSecret: string;
        success?: undefined;
        paymentIntentId?: undefined;
    }>;
    calculateBookingAmount(toolData: any, startDate: string, endDate: string): number;
}
