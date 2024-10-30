import exp from "constants";

export interface Review {
  id: string;
  rating: string;
  comment: string;
  date: string;
}

export interface ApiResponseReview {
  data: Review[];
  status: number;
  message: string;
}

export interface ProductReview {
  id: string;
  name: string;
}

export interface ApiResponseProductReview {
  data: ProductReview[];
  status: number;
  message: string;
}
