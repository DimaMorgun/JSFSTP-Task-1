import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services';

import { UserRole, UserModel } from 'src/app/shared/models';

@Component({
    selector: 'app-layout-general',
    templateUrl: './layout-general.component.html',
    styleUrls: ['./layout-general.component.scss']
})
export class LayoutGeneralComponent implements OnDestroy {
    private authSubject: Subscription;

    public isAdmin: boolean;

    constructor(
        private authService: AuthService,
    ) {
        this.initialize();
    }

    ngOnDestroy(): void {
        this.authSubject.unsubscribe();
    }

    private initialize(): void {
        this.authSubject = this.authService.currentUserSubject.subscribe(user => {
            this.checkAuth(user);
        });
    }

    private checkAuth(user: UserModel) {
        const isAuthenticated: boolean = user != null;
        this.isAdmin = isAuthenticated && user.userRole === UserRole.Admin;
    }
}
