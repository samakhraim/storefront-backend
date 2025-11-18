import { Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Default route = Product List
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Authentication
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Public Routes (NO login required)
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },

  // Protected Routes (user must be logged in)
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [authGuard] },

  // Wildcard fallback
  { path: '**', redirectTo: 'products' }
];
