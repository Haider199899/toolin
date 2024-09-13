declare class OrderItemDto {
    orderId: string;
    quantity: number;
}
export declare class ProcessPaymentDto {
    paymentMethodId: string;
    currency: string;
    orders: OrderItemDto[];
}
export {};
