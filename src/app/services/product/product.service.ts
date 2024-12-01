import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ApiResponse, ApiSaveResponse, Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/smart-consumption/api/v1/product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error obteniendo todos los productos:', error);
        throw error;
      })
    );
  }

  save(product: Product): Observable<ApiSaveResponse> {
    return this.http.post<ApiSaveResponse>(this.apiUrl, product).pipe(
      catchError((error) => {
        console.error('Error al crear el producto:', error);
        throw error;
      })
    );
  }

  delete(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error eliminando el producto:', error);
        throw error;
      })
    );
  }

  getProductByID(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error obteniendo el producto:', error);
        throw error;
      })
    );
  }
}
