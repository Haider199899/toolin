export declare class CreateBookingDto {
    orderIds: string[];
}
export declare class PriceBreakdownDto {
    insurance?: number;
    tax?: number;
    service?: number;
}
export declare class OrderDto {
    toolId: string;
    startDate: string;
    endDate: string;
    priceBreakdown: PriceBreakdownDto;
}
