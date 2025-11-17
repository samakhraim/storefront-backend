import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,      // ✅ required for *ngIf
    RouterOutlet,      // ✅ required for <router-outlet>
    NavbarComponent    // Navbar component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentRoute = '';

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  showNavbar() {
    return !(
      this.currentRoute.includes('login') ||
      this.currentRoute.includes('signup')
    );
  }
}
