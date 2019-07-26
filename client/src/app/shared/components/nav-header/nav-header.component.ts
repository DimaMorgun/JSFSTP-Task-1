import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.sass']
})
export class NavHeaderComponent {
  private isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
  ) {
    this.checkAuth();
  }

  private logout() {
    this.authService.logout();
  }

  private checkAuth() {
    this.authService.currentUserSubject.subscribe(user => {
      this.isAuthenticated = user !== null;
    });
  }
}
