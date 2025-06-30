import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CommonModule
  ]
})
export class Signup {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  emailExists = false;
  usernameExists = false;
  passwordMismatch = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    const { password, confirmPassword, email, username } = this.signupForm.value;

    this.passwordMismatch = password !== confirmPassword;

    this.emailExists = email === 'test@example.com';
    this.usernameExists = username === 'admin';

    if (this.signupForm.valid && !this.passwordMismatch && !this.emailExists && !this.usernameExists) {
      console.log('Form Data:', this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  
}
