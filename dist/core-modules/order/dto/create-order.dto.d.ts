export declare class PriceBreakdownDto {
    activePriceType: string;
    dailyBase: number;
    insurance: number;
    rentalLength: number;
    service: number;
    tax: number;
    total: number;
    totalBase: number;
}
export declare class TimelineItemDto {
    content: string;
    origin: string;
    timestamp?: Date;
    type: string;
}
export declare class CreateOrderDto {
    firstMessage: string;
    from: string;
    fromTimestamp: number;
    isActive: boolean;
    isMessagingEnabled: boolean;
    isPaid: boolean;
    ownerId: string;
    priceBreakdown: PriceBreakdownDto;
    renterId: string;
    status: string;
    timeline: TimelineItemDto[];
    timelineLastUpdatedOn?: Date;
    to: string;
    toTimestamp: number;
    toolId: string;
    toolName: string;
    totalPrice: number;
    unitPrice: number;
}
