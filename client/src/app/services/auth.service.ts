import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginRequestModel, LoginResponseModel } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private endpointUrl = `${environment.apiHttpsRoute}${environment.apiHttpsPort}/auth`;
    private loginControllerAction = '/login';

    constructor(
        private http: HttpClient,
    ) { }

    public async getToken(loginView: LoginRequestModel): Promise<LoginResponseModel> {
        let requestModel: LoginRequestModel;
        const responseModel: LoginResponseModel = {};

        try {
            requestModel = await this.http.post<LoginRequestModel>(this.endpointUrl + this.loginControllerAction, loginView).toPromise();

            responseModel.token = requestModel.token;
            responseModel.statusCode = 200;
        } catch (exception) {
            responseModel.statusCode = exception.status;
            responseModel.reason = exception.statusText;
        }

        return responseModel;
    }
}
