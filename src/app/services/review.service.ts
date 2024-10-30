import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ApiResponseReview, Review , ApiResponseProductReview, ProductReview } from '../interfaces/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/smart-consumption/api/v1/review';

  constructor(private http: HttpClient) {}

  addReview(review: Review, userId: string, productId: string): Observable<ApiResponseReview> {
    return this.http.post<ApiResponseReview>(`${this.apiUrl}/${userId}/${productId}`, review);
  }

  updateReview(review: Review, reviewId: string): Observable<ApiResponseReview> {
    return this.http.put<ApiResponseReview>(`${this.apiUrl}/${reviewId}`, review);
  }

  getProductAll(): Observable<ApiResponseProductReview> {
    return this.http.get<ApiResponseProductReview>(`${this.apiUrl}/product/all`);
  }

  getProductReviews(productId: string): Observable<ApiResponseReview> {
    return this.http.get<ApiResponseReview>(`${this.apiUrl}/productreview/${productId}`)
      .pipe(
        catchError((error) => {
          console.error('Error en el servicio:', error);
          throw error;
        })
      );
  }

}
