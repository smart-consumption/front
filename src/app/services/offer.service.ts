import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private http = inject(HttpClient);

  list(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:9002/smart-consumption/api-offer/v1/offer');
  }

  create(offer: any , productId : string){
    return this.http.post(`http://localhost:9002/smart-construction/api-offer/v1/offer/${productId}`,offer)
  }
}
