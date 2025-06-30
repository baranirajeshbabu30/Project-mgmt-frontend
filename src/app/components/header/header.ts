import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
 constructor(private router: Router) {}

  goToProjectForm() {
    this.router.navigate(['/dashboard/project-form']);
  }

    isProjectFormRoute(): boolean {
    return this.router.url.includes('/dashboard/project-form');
  }
}
