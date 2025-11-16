import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  name = '';
  address = '';
  cardNumber = '';

  constructor(private cartService: CartService, private router: Router) {}

  onSubmit(): void {
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.router.navigate(['/confirmation']);
  }
}
