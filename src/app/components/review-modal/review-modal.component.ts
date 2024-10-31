import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.css'
})
export class ReviewModalComponent {
[x: string]: any;
  @Input() productName: string = '';
  @Input() productId: string = '';
  @Input() reviews: Review[] = [];
  @Output() close = new EventEmitter<void>();
  isAddingReview = false;
  newReview: Review = { id: '', rating: 'AVERAGE', comment: '', date: '' };
  starRating = 3;

  constructor(private reviewService: ReviewService) {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStarRating(rating: string): number {
    switch (rating) {
      case 'TERRIBLE':
        return 1;
      case 'POOR':
        return 2;
      case 'AVERAGE':
        return 3;
      case 'GOOD':
        return 4;
      case 'EXCELLENT':
        return 5;
      default:
        return 3;
    }
  }

  getRatingLabel(rating: string): string {
    switch (rating) {
      case 'TERRIBLE':
        return 'Terrible';
      case 'POOR':
        return 'Pobre';
      case 'AVERAGE':
        return 'Promedio';
      case 'GOOD':
        return 'Bueno';
      case 'EXCELLENT':
        return 'Excelente';
      default:
        return 'Promedio';
    }
  }

  getRatingLabelNumber(number: number): string {
    switch (number) {
      case 1:
        return 'TERRIBLE';
      case 2:
        return 'POOR';
      case 3:
        return 'AVERAGE';
      case 4:
        return 'GOOD';
      case 5:
        return 'EXCELLENT';
      default:
        return 'AVERAGE';
    }
  }

  onClose(): void {
    this.close.emit();
  }


  onAddReview() {
    this.isAddingReview = true;
  }

  submitReview() {
    this.newReview.rating = this.getRatingLabelNumber(this.starRating);
    this.newReview.date = new Date().toISOString();

    this.reviewService.addReview(this.newReview, '1000', this.productId).subscribe({
      next: (response) => {
        this.isAddingReview = false;
        this.newReview.id = response.data.id;
        this.reviews.push(this.newReview);
      },
      error: (error) => {
        console.error('Error al agregar review:', error);
      }
    });
    this.isAddingReview = false;
  }

}
