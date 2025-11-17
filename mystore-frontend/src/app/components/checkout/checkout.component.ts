import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this!
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule here
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private cartService: CartService, private router: Router) {}

  onSubmit(form: any) {
    if (form.valid) {
      const order = {
        name: form.value.name,
        email: form.value.email,
        address: form.value.address,
        payment: form.value.payment,
        total: this.cartService.getTotal()
      };

      // Save order for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(order));

      // Clear cart and redirect
      this.cartService.clearCart();
      this.router.navigate(['/order-confirmation']);
    }
  }
}
