import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email = '';
  password = '';
  loading = false;
  error = '';
  success = '';
  showPassword = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  login() {
    // Clear previous messages
    this.error = '';
    this.success = '';

    // Validation
    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    this.loading = true;

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = 'Login successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.error = 'Invalid email or password';
        } else if (error.status === 0) {
          this.error = 'Unable to connect to server. Please try again.';
        } else {
          this.error = error.error?.message || 'Login failed. Please try again.';
        }
        console.error('Login error:', error);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // For demo/testing
  demoLogin() {
    this.email = 'admin@kanchu.in';
    this.password = 'demo123';
  }
}
