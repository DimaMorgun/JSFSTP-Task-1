import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';

import { UserModel, UserRole } from 'src/app/shared/models';

@Component({
    selector: 'app-nav-header',
    templateUrl: './nav-header.component.html',
    styleUrls: ['./nav-header.component.sass']
})
export class NavHeaderComponent {
    private isAuthenticated: boolean;
    private isAdmin: boolean;
    private userAlias: string;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.checkAuth();
    }

    private logout() {
        this.authService.logout();

        this.authService.currentUserSubject.subscribe(data => {
            this.checkAuth();
        });
    }

    private checkAuth() {
        let user: UserModel;
        this.authService.currentUserSubject.subscribe(data => {
            user = data;
        });

        this.isAuthenticated = user != null;
        this.isAdmin = this.isAuthenticated && user.userRole === UserRole.Admin;

        if (this.isAuthenticated) {
            this.userAlias = user.username.substr(0, 2).toUpperCase();
        }
    }
}
