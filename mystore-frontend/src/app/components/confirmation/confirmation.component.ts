import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  order: any;

  ngOnInit() {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
    }
  }
}
