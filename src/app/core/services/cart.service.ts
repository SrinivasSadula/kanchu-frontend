import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items$ = this.itemsSubject.asObservable();

  private saveToStorage(items: CartItem[]) {
    try { localStorage.setItem('kanchu_cart', JSON.stringify(items)); } catch (e) {}
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem('kanchu_cart');
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  getItems(): CartItem[] {
    return this.itemsSubject.getValue();
  }

  addItem(item: CartItem) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === item.id);
    if (idx >= 0) {
      items[idx].quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  updateQuantity(id: number, quantity: number) {
    const items = this.getItems();
    const idx = items.findIndex(i => i.id === id);
    if (idx >= 0) {
      items[idx].quantity = quantity > 0 ? quantity : 0;
      if (items[idx].quantity === 0) items.splice(idx, 1);
      this.itemsSubject.next(items);
      this.saveToStorage(items);
    }
  }

  removeItem(id: number) {
    const items = this.getItems().filter(i => i.id !== id);
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  clear() {
    this.itemsSubject.next([]);
    this.saveToStorage([]);
  }

  getCount(): number {
    return this.getItems().reduce((s, i) => s + i.quantity, 0);
  }
}
