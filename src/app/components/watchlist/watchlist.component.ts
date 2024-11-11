import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule] // Agregar FormsModule aquí
})
export class WatchlistComponent {
  watchlistForm: FormGroup;
  responseMessage: string = '';
  watchlistProducts: any[] = [];
  queryUserId: string = ''; // Aquí almacenamos el ID de usuario como string
  
  constructor(
    private fb: FormBuilder,
    private watchlistService: UserService
  ) {
    this.watchlistForm = this.fb.group({
      userId: [''],
      productId: ['']
    });
  }

  onSubmit() {
    if (this.watchlistForm.valid) {
      const { userId, productId } = this.watchlistForm.value;
      this.watchlistService.addToWatchlist(userId, productId).subscribe({
        next: () => {
          this.responseMessage = 'Producto agregado exitosamente a la watchlist';
          this.watchlistForm.reset(); // Limpiar el formulario después de agregar
        },
        error: () => {
          this.responseMessage = 'Error al agregar el producto a la watchlist';
        }
      });
    } else {
      this.responseMessage = 'Por favor, complete todos los campos del formulario';
    }
  }

  loadWatchlist(userId: string) {
    if (userId) {
      this.watchlistService.getWatchlist(userId).subscribe({
        next: (response: any) => {
          this.watchlistProducts = response.data;
        },
        error: () => {
          this.watchlistProducts = [];
          this.responseMessage = 'Error al consultar la watchlist';
        }
      });
    } else {
      this.responseMessage = 'Por favor ingrese un ID de usuario válido';
    }
  }
}
