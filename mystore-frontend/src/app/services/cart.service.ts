import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  // 🔥 BehaviorSubject keeps current cart state and emits updates
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    this.items.push(product);
    this.cartItemsSubject.next([...this.items]); // notify subscribers
  }

  getItems(): Product[] {
    return [...this.items];
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.cartItemsSubject.next([...this.items]); // notify update
  }

  clearCart(): Product[] {
    this.items = [];
    this.cartItemsSubject.next([]); // reset stream
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }
}
