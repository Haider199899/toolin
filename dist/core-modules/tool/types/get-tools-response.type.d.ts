declare class Geolocation {
    lng: number;
    lat: number;
}
declare class CreatedOn {
    _seconds: number;
    _nanoseconds: number;
}
export declare class ToolListResponseType {
    id: string;
    isAvailable: boolean;
    description: string;
    isOperatorAvailable: boolean;
    ownerId: string;
    createdOn: CreatedOn;
    priceDaily: number;
    mainImageIdx: number;
    priceWeekly: number;
    _geoloc: Geolocation;
    insuranceId: string;
    isOwnerApproved: boolean;
    model: string;
    brand: string;
    category1: string;
    category2: string;
    category3: string;
    images: string[];
    isPublished: boolean;
    marketValue: string;
    priceMonthly: number;
    isDeliveryAvailable: boolean;
    streetAddress: string;
    availableAfter: number;
    name: string;
    availableBefore: number;
    hasInsurance: boolean;
}
export {};
