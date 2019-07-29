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

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    public async login() {
        const requestModel: LoginRequestModel = {};
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: LoginResponseModel = await this.authService.login(requestModel);

        if (responseModel.status) {
            this.authService.currentUserSubject.subscribe(() => {
                this.router.navigate(['/']);
            });
        }
        if (!responseModel.status) {
            this.showErrorMessage(!responseModel.status, responseModel.errorMessage);
        }
    }

    public showErrorMessage(isError: boolean, message: string) {
        this.isShowMessage = true;
        this.isErrorMessage = isError;
        this.message = message;
    }
}
