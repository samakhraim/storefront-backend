import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  name = '';
  address = '';
  cardNumber = '';

  onSubmit() {
    console.log('Order submitted:', {
      name: this.name,
      address: this.address,
      cardNumber: this.cardNumber
    });
  }
}
