import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = null;
  productImages: string[] = [];
  currentImageIndex = 0;
  loading = true;
  error: string | null = null;
  quantity = 1;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private cartService = inject(CartService);

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

        // normalize images: prefer an images array, fallback to single image
        const imgs = this.product?.images || this.product?.imagesArray || this.product?.gallery || null;
        if (Array.isArray(imgs) && imgs.length) {
          this.productImages = imgs;
        } else if (this.product?.image) {
          this.productImages = [this.product.image];
        } else {
          this.productImages = [];
        }
        this.currentImageIndex = 0;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Error loading product:', err);
        this.error = 'Failed to load product.';
        this.loading = false;
      }
    });
  }

  prevImage() {
    if (!this.productImages || this.productImages.length <= 1) return;
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
  }

  nextImage() {
    if (!this.productImages || this.productImages.length <= 1) return;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
  }

  selectImage(i: number) {
    if (!this.productImages || i < 0 || i >= this.productImages.length) return;
    this.currentImageIndex = i;
  }

  addToCart() {
    console.log(`Added ${this.quantity} item(s) to cart`);
    if (!this.product) return;
    try {
      this.cartService.addItem({
        id: Number(this.product.id),
        name: this.product.name,
        price: Number(this.product.price) || 0,
        image: this.product.image,
        quantity: this.quantity
      });
      // simple UI feedback
      alert(`${this.quantity} × ${this.product.name} added to cart`);
    } catch (e) {
      console.error('Failed to add to cart', e);
    }
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
