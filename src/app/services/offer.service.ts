import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';
import { Offer,ApiResponseOffer } from '../interfaces/offer.interface';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:8080/smart-consumption/api/v1/offer';

  constructor(private http: HttpClient) {}

  list(): Observable<Offer[]> { 
    return this.http.get<ApiResponseOffer>(this.apiUrl)
      .pipe(
        map((response: ApiResponseOffer) => 
          response.data.map(offer => ({
            ...offer,
          }))
        ),
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

  update(offer: Offer, offerId: string): Observable<Offer> { 
    const url = `${this.apiUrl}/${offerId}`; 
    return this.http.put<Offer>(url, offer)
    .pipe( catchError((error) => { 
      console.error('Error al actualizar la oferta:', error); 
      return throwError(error); 
    }) ); 
  }

  delete(offerId: string): Observable<void> { 
    const url = `${this.apiUrl}/${offerId}`; 
    return this.http.delete<void>(url)
    .pipe( catchError((error) => { 
      console.error('Error al eliminar la oferta:', error); return throwError(error);
    }) ); 
  }
  
}


