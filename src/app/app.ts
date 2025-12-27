import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'kanchu-frontend';
  menuOpen = false;
  cartCount = 0;

  private cartService = inject(CartService);

  constructor() {
    this.cartService.items$.subscribe(items => this.cartCount = items.reduce((s, i) => s + i.quantity, 0));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
