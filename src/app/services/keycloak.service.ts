import { Injectable, Inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak: Keycloak;

  constructor(@Inject('Keycloak') keycloak: Keycloak) {
    this.keycloak = keycloak;
  }

  isLoggedIn(): boolean {
    return this.keycloak.authenticated || false;
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  getUserProfile() {
    return this.keycloak.loadUserProfile();
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  hasRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }
}
