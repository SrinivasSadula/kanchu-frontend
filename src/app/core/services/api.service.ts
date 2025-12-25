import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.base}/products`);
  }

  getProduct(id: number) {
    return this.http.get(`${this.base}/products/${id}`);
  }

  searchProducts(query: string) {
    return this.http.get(`${this.base}/products/search/query?q=${query}`);
  }

  sendEnquiry(data: any) {
    return this.http.post(`${this.base}/contact`, data);
  }

  getDashboard() {
    return this.http.get(`${this.base}/admin/dashboard`);
  }
}
