/* Auth Service - src/app/services/auth.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Sign up a new user
  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  // Log in and store token + user role/email
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.access_token) {
          this.setItem(this.tokenKey, res.access_token);
          this.setItem('role', credentials.role);
          this.setItem('email', credentials.email);
          console.log('Login successful, token stored:', res.access_token);
        } else {
          console.warn('Login response did not include a token');
        }
      })
    );
  }

  // Log out and remove session data
  logout(): void {
    this.removeItem(this.tokenKey);
    this.removeItem('role');
    this.removeItem('email');
    console.log('Logged out and token removed');
  }

  // LocalStorage helpers
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Session & Role checks
  isLoggedIn(): boolean {
    return !!this.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return this.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    return this.getItem('role');
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'Admin';
  }

  isViewer(): boolean {
    return this.getUserRole() === 'Viewer';
  }

  getUserEmail(): string | null {
  return localStorage.getItem('email');
}

}
