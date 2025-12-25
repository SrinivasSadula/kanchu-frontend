import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products = new BehaviorSubject<any[]>([]);
  products$ = this.products.asObservable();
  
  loading = new BehaviorSubject<boolean>(true);
  loading$ = this.loading.asObservable();
  
  error = new BehaviorSubject<string | null>(null);
  error$ = this.error.asObservable();

  private apiService = inject(ApiService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.next(true);
    this.error.next(null);
    
    this.apiService.getProducts().subscribe({
      next: (response: any) => {
        console.log('Products API Response:', response);
        if (response && response.data && Array.isArray(response.data)) {
          console.log('Setting products:', response.data);
          this.products.next(response.data);
        } else if (Array.isArray(response)) {
          this.products.next(response);
        }
        this.loading.next(false);
      },
      error: (err: any) => {
        console.error('Error loading products:', err);
        this.error.next('Failed to load products. Please try again later.');
        this.loading.next(false);
      }
    });
  }
}
