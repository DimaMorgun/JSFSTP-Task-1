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
    public username: string;
    public password: string;
    public info: string;

    constructor(
        private authService: AuthService,
    ) { }

    public async login() {
        const requestModel: LoginRequestModel = {};
        requestModel.username = this.username;
        requestModel.password = this.password;

        const responseModel: LoginResponseModel = await this.authService.getToken(requestModel);

        if (responseModel.statusCode === 200) {
            this.info = responseModel.token;
        } else {
            this.info = responseModel.reason;
        }
    }
}
