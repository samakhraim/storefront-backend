import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit(form: any) {
    if (form.valid) {
      const orderPayload = {
        full_name: form.value.name,
        email: form.value.email,
        shipping_address: form.value.address,
        payment_method: form.value.payment,
        total_price: this.cartService.getTotal(),
        products: this.cartService.getItems().map(item => ({
          id: item.id,
          quantity: item.quantity || 1,
        })),
      };

      this.http.post('http://localhost:3000/orders', orderPayload).subscribe({
        next: (response: any) => {
          // Save summary for confirmation page
          localStorage.setItem(
            'lastOrder',
            JSON.stringify({
              ...orderPayload,
              order_id: response.order_id,
            })
          );

          this.cartService.clearCart();
          this.router.navigate(['/order-confirmation']);
        },
        error: (err) => {
          console.error('Order failed:', err);
          alert('Order creation failed!');
        },
      });
    }
  }
}
