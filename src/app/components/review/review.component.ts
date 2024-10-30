import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { Review , ProductReview} from '../../interfaces/review.interface';
import { ReviewModalComponent } from "../review-modal/review-modal.component";

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReviewModalComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  @Input() productReviews: ProductReview[] = [];
  selectedReviews: Review[] = [];
  selectedProductName: string = '';
  showModal: boolean = false;
  loading = false;
  error: string | null = null;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.error = null;
    this.reviewService.getProductAll().subscribe({
      next: (response) => {
        this.productReviews = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar reviews:', error);
        this.error = 'Error al cargar los reviews. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  loadProductReviews(productId: string, productName: string): void {
    this.error = null;
    this.reviewService.getProductReviews(productId).subscribe({
      next: (response) => {
        this.selectedReviews = response.data;
        this.selectedProductName = productName;
        this.showModal = true;
      },
      error: (error) => {
        console.error('Error al cargar reviews del producto:', error);
        this.error = 'Error al cargar los reviews del producto. Por favor, intenta de nuevo.';
      }
    });
  }

  closeReviews(): void {
    this.selectedReviews = [];
    this.selectedProductName = '';
    this.showModal = false;
  }



}
