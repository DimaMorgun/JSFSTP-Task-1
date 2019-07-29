import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import {
    LoginRequestModel,
    LoginResponseModel,
} from 'src/app/shared/models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent {
    private username: string;
    private password: string;

    private isShowMessage: boolean;
    private isErrorMessage: boolean;
    private message: string;

    private invalidCredentialsMessage = 'Invalid credentials.';
    private unhandledErrorMessage = 'Something went wrong.';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    public async login() {
        const requestModel: LoginRequestModel = {};
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: LoginResponseModel = await this.authService.login(requestModel);

        if (responseModel.statusCode === 200) {
            this.authService.currentUserSubject.subscribe(() => {
                this.router.navigate(['/']);
            });
        }
        if (responseModel.statusCode !== 200) {
            this.showErrorMessage(responseModel.statusCode);
        }
    }

    public showErrorMessage(statusCode?: number, message?: string) {
        if (message) {
            this.isShowMessage = true;
            this.isErrorMessage = true;
            this.message = message;
        }
        if (statusCode && statusCode === 401) {
            this.isShowMessage = true;
            this.isErrorMessage = true;
            this.message = this.invalidCredentialsMessage;
        }
        if (statusCode && statusCode !== 401) {
            this.isShowMessage = true;
            this.isErrorMessage = true;
            this.message = this.unhandledErrorMessage;
        }
    }
}
