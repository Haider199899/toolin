export declare class GeolocDTO {
    lat: number;
    lng: number;
}
export declare class CreateToolDTO {
    brand: string;
    model: string;
    name: string;
    images: string[];
    _geoloc: GeolocDTO;
    availableAfter?: number;
    availableBefore?: number;
    description?: string;
    hasInsurance: boolean;
    insuranceId?: string;
    isAvailable: boolean;
    isDeliveryAvailable: boolean;
    isOperatorAvailable: boolean;
    isOwnerApproved: boolean;
    isPublished: boolean;
    mainImageIdx?: number;
    marketValue?: string;
    priceDaily?: number;
    priceMonthly?: number;
    priceWeekly?: number;
    streetAddress?: string;
    category1?: string;
    category2?: string;
    category3?: string;
}
