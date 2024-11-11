import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import swal from 'sweetalert2';


@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css',
  
})
export class ListProductComponent {

  products: Product[] = [];
  loading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    
    this.productService.getAll().subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
        console.log(response)
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos. Por favor, intenta de nuevo.';
        this.loading = false;
      }
    });
  }


  eliminar(product: Product) {
    swal.fire({
      title: 'Eliminar',
      text: '¿Estás seguro de que deseas eliminar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.productService.delete(product.id)
          .subscribe(response => {
            console.log(response.status)
            if (response.status === 200) {
              this.products = this.products.filter(s => s !== product);
              swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
            } else {
              swal.fire('Cancelado', 'No se eliminó el estudiante.', 'error');
            }
          })
      } else {
        swal.fire('Cancelado', 'No se eliminó el estudiante.', 'error');
      }
    });
  }


}
