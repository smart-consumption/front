import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { Offer } from '../interfaces/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8080/smart-consumption/api/v1/offer';

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

  create(offer: Offer, productId: string): Observable<Offer> {
    const url = `${this.apiUrl}/${productId}`;
    console.log(url);
    return this.http.post<Offer>(url, offer)
      .pipe(
        catchError((error) => {
          console.error('Error al crear la oferta:', error);
          return throwError(error);
        })
      );
  }
}


