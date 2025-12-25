import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = null;
  loading = true;
  error: string | null = null;
  quantity = 1;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      console.log('Loading product:', productId);
      if (!productId) {
        this.error = 'Invalid product id';
        this.loading = false;
        return;
      }
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number) {
    this.loading = true;
    this.error = null;
    this.apiService.getProduct(id).subscribe({
      next: (res: any) => {
        if (res && res.data) this.product = res.data;
        else this.product = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product.';
        this.loading = false;
      }
    });
  }

  addToCart() {
    console.log(`Added ${this.quantity} item(s) to cart`);
    // TODO: Add to cart logic
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
