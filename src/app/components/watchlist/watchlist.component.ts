import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule]
  })
  export class WatchlistComponent {
    watchlistForm: FormGroup;
    responseMessage: string = '';
    watchlistProducts: any[] = [];
  
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
            this.responseMessage = 'Producto agregado exitosamente';
            this.loadWatchlist(userId);
          },
          error: () => {
            this.responseMessage = 'Error al agregar el producto';
          }
        });
      }
    }
  
    loadWatchlist(userId: string) {
      this.watchlistService.getWatchlist(userId).subscribe({
        next: (response: any) => {
          this.watchlistProducts = response.data;
        },
        error: () => {
          this.watchlistProducts = [];
        }
      });
    }
  }