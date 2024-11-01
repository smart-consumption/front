import { Component, inject } from '@angular/core';
import { RouterModule,Router} from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { OfferService } from '../../services/offer.service';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'app-add-offer',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})


export default class AddOfferComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private offerService = inject(OfferService);

  offerData: Offer = {
    description: '',
    period: { 
      startDate: '', 
      endDate: '' 
    },
    discountPercentage: '',
  };

  form = this.fb.group({
    description: ['', [Validators.required, Validators.minLength(5)]],
    Fechainicio: ['', Validators.required],
    Fechafin: ['', Validators.required],
    discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    productId: ['', Validators.required]
  });

  onSubmit() {
    this.offerData = {
      description: this.form.value.description || '',
      period: { 
        startDate: this.form.value.Fechainicio || '', 
        endDate: this.form.value.Fechafin || '' 
      },
      discountPercentage: this.form.value.discount || '',
    };

    console.log(this.offerData);
    console.log(this.form.value.productId);

    this.offerService.create(this.offerData, String(this.form.value.productId)).subscribe({
      next: (response) => {
        console.log("Oferta creada con éxito:", response);
        this.router.navigate(['/ofertas']);
      },
      error: (error) => console.error("Error al crear la oferta:", error)
    });
  }
}
