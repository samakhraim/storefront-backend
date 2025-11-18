import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount = 0;
  isMenuOpen = false;
  isLoggedIn = false;
  userName: string | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Update cart count
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
    });

    // Check login status
    this.isLoggedIn = !!localStorage.getItem('token');

    // Load user's name
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      this.userName = userObj.first_name;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.userName = null;

    this.isMenuOpen = false;

    // Redirect to the product page
    this.router.navigate(['/']);
  }
}
