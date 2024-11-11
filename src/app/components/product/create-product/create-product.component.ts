import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import swal from 'sweetalert2';
import { Category, Product, ProductStatus } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
})
export default class CreateProductComponent {

  public productForm: FormGroup;


  // Inicialización del modelo
  productModel: Product = {
    id: '',
    name: '',
    category: { categoryName: '' },
    detail: { description: '', specifications: null },
    sustainabilityCriteria: {
      carbonFootprint: 0,
      energyEfficiency: 0,
      resourceUsage: 0,
      wasteManagement: 0,
      sustainabilityScore: 0
    },
    status: ProductStatus.AVAILABLE,
    price: 0
  };

  productStatuses = Object.values(ProductStatus);
  categories: Category[] = [
    { categoryName: 'Electronics' },
    { categoryName: 'Furniture' },
    { categoryName: 'Clothing' },
    { categoryName: 'Food' },
  ];

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.productForm = this.createFormProduct();
  }


  // Método para crear el formulario reactivo
  createFormProduct(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      category: new FormControl('', [Validators.required]),
      detail: this.formBuilder.group({
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        specifications: new FormControl('', [Validators.required, Validators.minLength(8)])
      }),
      sustainabilityCriteria: this.formBuilder.group({
        carbonFootprint: new FormControl(0, [Validators.required, Validators.min(0)]),
        energyEfficiency: new FormControl(0, [Validators.required, Validators.min(0)]),
        resourceUsage: new FormControl(0, [Validators.required, Validators.min(0)]),
        wasteManagement: new FormControl(0, [Validators.required, Validators.min(0)]),
        sustainabilityScore: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)])
      }),
      status: new FormControl(ProductStatus.AVAILABLE, [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  }

  // Método para guardar el producto
  saveProduct() {
    Object.assign(this.productModel, this.productForm.value); // Asignar valores del formulario al modelo

    console.log(this.productModel);

    // Llamar al servicio para guardar el producto
    this.productService.save(this.productModel).subscribe(response => {
      swal.fire('Producto registrado!', `El producto ${response.data.name} ha sido creado!`, 'success');
      this.router.navigate(['/productos']);
    }, err => {
      swal.fire('Error', `${err.error}`, 'error');
    });
  }


  // Getter para acceder a los controles del formulario
  get name() { return this.productForm.get('name'); }
  get category() { return this.productForm.get('category'); }
  get description() { return this.productForm.get('detail.description'); }
  get specifications() { return this.productForm.get('detail.specifications'); }
  get carbonFootprint() { return this.productForm.get('sustainabilityCriteria.carbonFootprint'); }
  get energyEfficiency() { return this.productForm.get('sustainabilityCriteria.energyEfficiency'); }
  get resourceUsage() { return this.productForm.get('sustainabilityCriteria.resourceUsage'); }
  get wasteManagement() { return this.productForm.get('sustainabilityCriteria.wasteManagement'); }
  get sustainabilityScore() { return this.productForm.get('sustainabilityCriteria.sustainabilityScore'); }
  get status() { return this.productForm.get('status'); }
  get price() { return this.productForm.get('price'); }
}
