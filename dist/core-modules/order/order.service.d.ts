import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    constructor();
    createOrder(createOrderDto: CreateOrderDto[]): Promise<any[]>;
    getOrderByUserIdAndOrderId(userId: string, orderId: string): Promise<{
        id: string;
    }>;
}
