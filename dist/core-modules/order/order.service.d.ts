import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    constructor();
    createOrder(createOrderDto: CreateOrderDto[]): Promise<any[]>;
    getOrderByUserIdAndOrderId(orderId: string): Promise<{
        id: string;
    }>;
}
