import { Component, OnInit, inject } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-offer',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, ReactiveFormsModule],
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export default class ListOfferComponent implements OnInit {
  private offerService = inject(OfferService);
  private fb = inject(FormBuilder);
  offers: any[] = [];
  isEditModalOpen = false;
  editForm: FormGroup;
  selectedOffer: any = null;

  constructor() {
    this.editForm = this.fb.group({
      description: [''],
      startDate: [''],
      endDate: [''],
      discountPercentage: ['']
    });
  }

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
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

  deleteOffer(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      this.offerService.delete(id).subscribe({
        next: () => {
          this.loadOffers(); 
        },
        error: (error) => {
          console.error('Error al eliminar oferta:', error);
        }
      });
    }
  }

  editOffer(offer: any): void {
    this.isEditModalOpen = true;
    this.selectedOffer = offer;

    this.editForm.patchValue({
      description: offer.description,
      startDate: offer.period.startDate,
      endDate: offer.period.endDate,
      discountPercentage: offer.discountPercentage
    });
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedOffer = null;
    this.editForm.reset();
  }

  updateOffer(offerId: string): void {
    if (this.editForm.valid && this.selectedOffer) {
      const updatedOffer = {
        ...this.selectedOffer,
        description: this.editForm.value.description,
        period: {
          startDate: this.editForm.value.startDate,
          endDate: this.editForm.value.endDate
        },
        discountPercentage: this.editForm.value.discountPercentage
      };

      this.offerService.update(updatedOffer, offerId).subscribe({
        next: () => {
          this.loadOffers();
          this.closeEditModal(); 
        },
        error: (error) => {
          console.error('Error al actualizar la oferta:', error);
        }
      });
    }
  }
}
