import { Component } from '@angular/core';

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
    // tslint:disable-next-line:max-line-length
    private usernamePattern: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    private username: string;
    private passwordPattern: RegExp = new RegExp(/[A-Za-z0-9_ ]{5,16}/);
    private password: string;

    private isShowMessage: boolean;
    private isErrorMessage: boolean;
    private message: string;

    private invalidCredentialsMessage = 'Invalid credentials.';
    private unhandledErrorMessage = 'Something went wrong.';
    private credentialRequirmentsMessage = 'Credentials do not meet requirments.';

    constructor(
        private authService: AuthService,
    ) { }

    public async login() {
        const isCredentialsValid: boolean = this.testCredentials();
        if (!isCredentialsValid) {
            this.showErrorMessage(0, this.credentialRequirmentsMessage);

            return;
        }

        const requestModel: LoginRequestModel = {};
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: LoginResponseModel = await this.authService.login(requestModel);

        if (responseModel.statusCode === 200) {
            this.isShowMessage = true;
            this.isErrorMessage = false;
            this.message = 'Logged in successfully.';
        }
        if (responseModel.statusCode !== 200) {
            this.showErrorMessage(responseModel.statusCode);
        }
    }

    public testCredentials(): boolean {
        const result = this.usernamePattern.test(this.username) && this.passwordPattern.test(this.password);

        return result;
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
            console.log(2);
        }
        if (statusCode && statusCode !== 401) {
            this.isShowMessage = true;
            this.isErrorMessage = true;
            this.message = this.unhandledErrorMessage;
            console.log(3);
        }
    }
}
