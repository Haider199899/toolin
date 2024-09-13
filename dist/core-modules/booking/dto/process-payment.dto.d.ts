declare class OrderItemDto {
    orderId: string;
    quantity: number;
    price: number;
}
export declare class ProcessPaymentDto {
    paymentMethodId: string;
    currency: string;
    orders: OrderItemDto[];
    totalAmount: number;
}
export {};
