import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  hover = false;

 constructor(private router: Router,public authService: Auth) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToProjectForm() {
    this.router.navigate(['/dashboard/project-form']);
  }

    isProjectFormRoute(): boolean {
    return this.router.url.includes('/dashboard/project-form');
  }
}
