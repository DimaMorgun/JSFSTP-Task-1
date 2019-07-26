import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequestModel, LoginResponseModel } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private endpointUrl = `${environment.apiHttpsRoute}${environment.apiHttpsPort}/auth`;
    private loginAction = `${this.endpointUrl}/login`;

    constructor(
        private http: HttpClient,
    ) { }

    public async login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
        const loginResponseModel: LoginResponseModel = await this.getToken(loginRequestModel);

        if (loginResponseModel.statusCode === 200) {
            this.setSession(loginResponseModel.token);
        }

        return loginResponseModel;
    }

    public async getToken(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
        let responseModel: LoginResponseModel = {};

        try {
            responseModel = await this.http.post<LoginResponseModel>(this.loginAction, loginRequestModel).toPromise();

            responseModel.statusCode = 200;
        } catch (exception) {
            responseModel.statusCode = exception.status;
            responseModel.reason = exception.statusText;
        }

        return responseModel;
    }

    private setSession(token) {
        localStorage.setItem('access_token', token);
    }
}
