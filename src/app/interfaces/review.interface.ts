import exp from "constants";

export interface Review {
  id: string | null;
  rating: string;
  comment: string;
  date: string;
}

export interface ApiListResponseReview {
  data: Review[];
  status: number;
  message: string;
}

export interface ApiResponseReview {
  data: Review;
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
