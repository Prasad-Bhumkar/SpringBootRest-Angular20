import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
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

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
