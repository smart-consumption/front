export interface Offer {
    description: string;
    period: { startDate: string; endDate: string}
    discountPercentage: string | number;
}