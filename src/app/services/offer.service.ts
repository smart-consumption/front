import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:9002/smart-consumption/api-offer/v1/offer'; 
  constructor(private http: HttpClient) {}

  list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error en el servicio:', error);
          return throwError(error);
        })
      );
  }

  create(offer: any, productId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${productId}`, offer)
      .pipe(
        catchError((error) => {
          console.error('Error al crear la oferta:', error);
          return throwError(error);
        })
      );
  }
}
