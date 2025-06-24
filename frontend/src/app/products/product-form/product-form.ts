import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  product: Product = { id: 0, name: '', description: '', price: 0 };
  isEditMode = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      const id = Number(idParam);
      if (!isNaN(id)) {
        this.productService.getProductById(id).subscribe({
          next: (data) => this.product = data,
          error: (err) => console.error('Error loading product', err)
        });
      } else {
        console.error('Invalid product id:', idParam);
      }
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.product.id !== undefined) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error updating product', err)
      });
    } else {
      this.productService.createProduct(this.product).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => console.error('Error creating product', err)
      });
    }
  }
}
