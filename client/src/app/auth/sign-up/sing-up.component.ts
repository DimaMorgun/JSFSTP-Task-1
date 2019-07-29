import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';
import { SignUpRequestModel, SignUpResponseModel } from 'src/app/shared/models';

@Component({
    selector: 'app-sing-up',
    templateUrl: './sing-up.component.html',
    styleUrls: ['./sing-up.component.sass']
})
export class SingUpComponent {
    private fullname: string;
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
        private router: Router,
    ) {
    }

    public async signUp() {
        const isCredentialsValid: boolean = this.testCredentials();
        if (!isCredentialsValid) {
            this.showErrorMessage(0, this.credentialRequirmentsMessage);

            return;
        }

        const requestModel: SignUpRequestModel = {};
        requestModel.fullname = this.fullname;
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: SignUpResponseModel = await this.authService.signUp(requestModel);
        console.log(responseModel);

        if (responseModel.statusCode === 200) {
            this.router.navigate(['/auth/login']);
        }
        if (responseModel.statusCode !== 200) {
            this.showErrorMessage(0, responseModel.reason);
        }
    }

    public testCredentials(): boolean {
        const isFullNameValid = this.fullname && this.fullname.trim().length > 5;
        const isUsernameValid = this.usernamePattern.test(this.username);
        const isPasswordValid = this.passwordPattern.test(this.password);
        const result = isFullNameValid && isUsernameValid && isPasswordValid;

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
        }
        if (statusCode && statusCode !== 401) {
            this.isShowMessage = true;
            this.isErrorMessage = true;
            this.message = this.unhandledErrorMessage;
        }
    }
}
