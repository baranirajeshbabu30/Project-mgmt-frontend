import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectForm {
 form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Submitted project:', this.form.value);
      this.router.navigate(['/dashboard/projects']);
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/projects']);
  }
}
