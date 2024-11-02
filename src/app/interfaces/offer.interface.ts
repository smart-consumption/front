export interface Offer {
    description: string;
    period: { startDate: string; endDate: string}
    discountPercentage: string | number;
}


export interface ApiResponseOffer {
    data: Offer[];
    status: number;
    message: string;
}