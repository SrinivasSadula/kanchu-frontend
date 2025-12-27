import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  public cartService = inject(CartService);
  items: CartItem[] = [];

  constructor() {
    this.cartService.items$.subscribe(i => this.items = i);
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  updateQuantity(item: CartItem, delta: number) {
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      this.cartService.removeItem(item.id);
    } else {
      this.cartService.updateQuantity(item.id, newQty);
    }
  }

  get total() {
    return this.items.reduce((s, it) => s + (it.price || 0) * it.quantity, 0);
  }
}
