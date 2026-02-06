import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  hide = true;
  loading = false;
  year = new Date().getFullYear();

  form;

  // ✅ one allowed username + password
  private readonly ALLOWED_USER = 'admin';
  private readonly ALLOWED_PASS = '12345';

  constructor(private fb: FormBuilder, private router: Router) {
    // ✅ username, not email
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const username = (this.form.value.username ?? '').trim();
    const password = this.form.value.password ?? '';

    if (username !== this.ALLOWED_USER || password !== this.ALLOWED_PASS) {
      alert('Invalid username or password');
      return;
    }
    localStorage.setItem('loggedIn', 'true');
    this.router.navigateByUrl('/dashboard');

    this.router.navigateByUrl('/dashboard');
  }
}
