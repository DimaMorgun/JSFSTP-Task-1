import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import * as jwtDecode from 'jwt-decode';

import { LoginRequestModel, LoginResponseModel, UserModel } from 'src/app/shared/models';

import { environment } from 'src/environments/environment';


@Injectable()
export class AuthService {
    private endpointUrl = `${environment.apiHttpsRoute}${environment.apiHttpsPort}/auth`;
    private loginAction = `${this.endpointUrl}/login`;
    public currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: UserModel;

    constructor(
        private http: HttpClient,
    ) {
        this.currentUser = this.getUserSession();
        this.currentUserSubject = new BehaviorSubject<UserModel>(this.currentUser);
    }

    public async login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
        const loginResponseModel: LoginResponseModel = await this.getToken(loginRequestModel);

        if (loginResponseModel.statusCode === 200) {
            this.setSession(loginResponseModel.token);

            this.currentUser = jwtDecode(loginResponseModel.token);
            this.currentUser.token = loginResponseModel.token;

            this.currentUserSubject.next(this.currentUser);
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

    private getUserSession(): UserModel {
        let user: UserModel = {};

        try {
            const token: string = localStorage.getItem('access_token');
            user = jwtDecode(token);
            user.token = token;
        } catch (error) {
            user = null;
        }

        return (user);
    }

    private setSession(token) {
        localStorage.setItem('access_token', token);
    }

    public logout() {
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
    }
}
