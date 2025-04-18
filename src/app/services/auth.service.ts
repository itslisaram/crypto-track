import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly key = 'loggedUser';

  get user(): string | null {
    return localStorage.getItem(this.key);
  }

  login(username: string): void {
    localStorage.setItem(this.key, username);
  }

  logout(): void {
    localStorage.removeItem(this.key);
    window.location.reload();
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }
}
