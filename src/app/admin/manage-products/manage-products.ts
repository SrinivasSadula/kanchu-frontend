import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  material: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css',
})
export class ManageProducts {
  products: Product[] = [];
  showForm = false;
  editingId: number | null = null;

  newProduct: Product = {
    id: 0,
    name: '',
    material: '',
    price: 0,
    image: '',
    description: '',
  };

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    // TODO: Load from API
  }

  openForm() {
    this.showForm = true;
    this.resetForm();
  }

  closeForm() {
    this.showForm = false;
    this.resetForm();
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      material: '',
      price: 0,
      image: '',
      description: '',
    };
    this.editingId = null;
  }

  saveProduct() {
    // TODO: Save to API
    this.closeForm();
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.editingId = product.id;
    this.showForm = true;
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      // TODO: Delete from API
      this.products = this.products.filter(p => p.id !== id);
    }
  }
}
