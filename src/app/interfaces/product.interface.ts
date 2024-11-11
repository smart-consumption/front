export interface Product {
    id: string;
    name: string;
    category: Category;
    detail: Detail;
    sustainabilityCriteria: SustainabilityCriteria;
    status: ProductStatus;
    price: number;
}

export interface Category {
    categoryName: string;
}

export interface Detail {
    description: string;
    specifications: string | null; 
}

export interface SustainabilityCriteria {
    carbonFootprint: number;
    energyEfficiency: number;
    resourceUsage: number;
    wasteManagement: number;
    sustainabilityScore: number;
}

export enum ProductStatus {
    AVAILABLE = "AVAILABLE",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    DISCONTINUED = "DISCONTINUED"
}

export interface ApiResponse {
    data: Product[];
    status: number;
    message: string;
}

export interface ApiSaveResponse {
    data: Product;
    status: number;
    message: string;
}

