import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  /**
   * Add a product to the cart.
   * If the product already exists, increase its quantity.
   */
  addToCart(product: Product): void {
    const existing = this.items.find(p => p.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next([...this.items]);
  }

  /**
   * Get cart items.
   */
  getItems(): Product[] {
    return [...this.items];
  }

  /**
   * Remove a product from cart.
   */
  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.cartItemsSubject.next([...this.items]);
  }

  /**
   * Clear the cart.
   */
  clearCart(): void {
    this.items = [];
    this.cartItemsSubject.next([]);
  }

  /**
   * Get total price for all items.
   */
  getTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
  }
}
