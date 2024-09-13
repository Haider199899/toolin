import { ProcessPaymentDto } from './dto/process-payment.dto';
import { StripePaymentService } from 'src/shared/stripe/stripe-service';
import { UserService } from '../user/user.service';
import { ToolService } from '../tool/tool.service';
export declare class BookingService {
    private readonly stripeService;
    private readonly userService;
    private readonly toolService;
    private bookingsCollection;
    private ordersCollection;
    constructor(stripeService: StripePaymentService, userService: UserService, toolService: ToolService);
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
    private calculateOrderTotal;
    private updateOrderStatuses;
}
