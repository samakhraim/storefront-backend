import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: any) {
    this.auth.signup(form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => alert('Signup failed')
    });
  }
}
