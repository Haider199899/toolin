import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ProcessPaymentDto } from './dto/process-payment.dto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
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
}
