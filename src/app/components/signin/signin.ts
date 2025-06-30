import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-signin',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin {
  signinForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;

      console.log('Login attempt:', { email, password });

      this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/dashboard/projects']);
    } else {
      this.snackBar.open('Please enter valid credentials.', 'Close', { duration: 3000 });
    }
  }

}
