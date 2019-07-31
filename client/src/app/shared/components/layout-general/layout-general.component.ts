import { Component, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services';

import { UserRole, UserModel } from 'src/app/shared/models';
import { takeUntil } from 'rxjs/operators';

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
        this.checkAuth();
    }

    ngOnDestroy(): void {
        this.authSubject.unsubscribe();
    }

    private checkAuth() {
        let user: UserModel;
        this.authSubject = this.authService.currentUserSubject.subscribe(data => {
            console.log('LayoutGeneralComponent -> authSubject', data);
            user = data;
        });

        const isAuthenticated: boolean = user != null;
        this.isAdmin = isAuthenticated && user.userRole === UserRole.Admin;
    }
}
