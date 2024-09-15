import { OrdersService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto[]): Promise<any[]>;
    getOrderByUserIdAndOrderId(orderId: string): Promise<{
        id: string;
    }>;
}
