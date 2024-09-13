import { BookingService } from './booking.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<{
        success: boolean;
        bookingId: string;
        paymentIntentId: any;
        orders: any[];
        renterId: string;
        createdAt: string;
        updatedAt: string;
        requiresAction?: undefined;
        clientSecret?: undefined;
    } | {
        requiresAction: boolean;
        clientSecret: any;
        success?: undefined;
        bookingId?: undefined;
        paymentIntentId?: undefined;
        orders?: undefined;
        renterId?: undefined;
        createdAt?: undefined;
        updatedAt?: undefined;
    }>;
}
