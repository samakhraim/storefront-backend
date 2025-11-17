import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/order-products';
  private items: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  addToCart(product: Product): void {
    this.items.push(product);
    this.cartItemsSubject.next([...this.items]);

    const payload = {
      order_id: 1, // TODO: dynamically set later
      product_id: product.id,
      quantity: 1
    };

    this.http.post(this.apiUrl, payload).subscribe({
      next: () => console.log('✅ Added product to backend'),
      error: err => console.error('❌ Error saving to backend:', err)
    });
  }

  getItems(): Product[] {
    return [...this.items];
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.cartItemsSubject.next([...this.items]);
  }

  clearCart(): Product[] {
    this.items = [];
    this.cartItemsSubject.next([]);
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }
}
