import { Component, OnInit, inject  } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-offer',
  standalone: true,
  imports: [CommonModule,RouterModule, DatePipe],
  templateUrl: './list-offer.component.html',
  styleUrl: './list-offer.component.css'
})
export default class ListOfferComponent implements OnInit {
  private offerService = inject(OfferService);
  offers: any[] = [];

    ngOnInit(): void {
      this.offerService.list().subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            this.offers = response;
          } else if (response && response.data) {
            this.offers = response.data;
          } else {
            console.error('La respuesta no es un array ni contiene una propiedad data:', response);
          }
        },
        error => console.error('Error al obtener las ofertas:', error)
      );
    }

    trackById(index: number, item: any): number {
      return item.id;
    }
}


