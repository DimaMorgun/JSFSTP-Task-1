import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services';
import { SignUpRequestModel, BaseResponseModel } from 'src/app/shared/models';

@Component({
    selector: 'app-sing-up',
    templateUrl: './sing-up.component.html',
    styleUrls: ['./sing-up.component.sass']
})
export class SingUpComponent {
    public fullname: string;
    // tslint:disable-next-line:max-line-length
    public usernamePattern: RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    public username: string;
    public passwordPattern: RegExp = new RegExp(/[A-Za-z0-9_ ]{5,16}/);
    public password: string;

    public isShowMessage: boolean;
    public isErrorMessage: boolean;
    public message: string;

    private credentialRequirmentsMessage = 'Credentials do not meet requirments.';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    public async signUp() {
        const isCredentialsValid: boolean = this.testCredentials();
        if (!isCredentialsValid) {
            this.showErrorMessage(true, this.credentialRequirmentsMessage);

            return;
        }

        const requestModel: SignUpRequestModel = {};
        requestModel.fullname = this.fullname;
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: BaseResponseModel = await this.authService.signUp(requestModel);

        if (responseModel.status) {
            this.router.navigate(['/auth/login']);
        }
        if (!responseModel.status) {
            this.showErrorMessage(!responseModel.status, responseModel.errorMessage);
        }
    }

    public testCredentials(): boolean {
        const isFullNameValid = this.fullname && this.fullname.trim().length > 5;
        const isUsernameValid = this.usernamePattern.test(this.username);
        const isPasswordValid = this.passwordPattern.test(this.password);
        const result = isFullNameValid && isUsernameValid && isPasswordValid;

        return result;
    }

    public showErrorMessage(isError: boolean, message: string) {
        this.isShowMessage = true;
        this.isErrorMessage = isError;
        this.message = message;
    }
}
