import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Auth } from '../../services/auth/auth';

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
    MatSelectModule,
    RouterModule,
    CommonModule,
    MatSnackBarModule,
  ]
})
export class Signup  {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  roles = ['Admin', 'Viewer'];

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }



 passwordMatchValidator(formGroup: FormGroup): null {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('confirmPassword');

  if (!passwordControl || !confirmPasswordControl) return null;

  const password = passwordControl.value;
  const confirmPassword = confirmPasswordControl.value;

  if (password !== confirmPassword) {
    confirmPasswordControl.setErrors({ passwordMismatch: true });
  } else {
    if (confirmPasswordControl.hasError('passwordMismatch')) {
      confirmPasswordControl.setErrors(null);
    }
  }

  return null; 
}


  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, username, password, role } = this.signupForm.value;
      const payload = { email, username, password, role };

      this.authService.signup(payload).subscribe({
        next: () => {
          this.snackBar.open('Signup successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error: { error: { message: string } }) => {
          const message = error?.error?.message || 'Signup failed!';
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
