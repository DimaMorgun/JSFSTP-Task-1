import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import * as jwtDecode from 'jwt-decode';

import {
    LoginRequestModel,
    LoginResponseModel,
    UserModel,
    SignUpRequestModel,
    SignUpResponseModel,
} from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private endpointUrl = `${environment.apiHttpsRoute}${environment.apiHttpsPort}`;
    private loginAction = `${this.endpointUrl}/auth/login`;
    private signUpAction = `${this.endpointUrl}/user`;
    public currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: UserModel;

    constructor(
        private http: HttpClient,
    ) {
        this.currentUser = this.getUserSession();
        this.currentUserSubject = new BehaviorSubject<UserModel>(this.currentUser);
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

    private setSession(token) {
        localStorage.setItem('access_token', token);
    }

    public async signUp(signUpRequestModel: SignUpRequestModel): Promise<SignUpResponseModel> {
        const signUpResponseModel: SignUpResponseModel = {};

        try {
            const user: UserModel = await this.http.post<UserModel>(this.signUpAction, signUpRequestModel).toPromise();

            if (!user.id) {
                signUpResponseModel.statusCode = 200;
            }
            if (user.id) {
                signUpResponseModel.statusCode = 409;
                signUpResponseModel.reason = 'User Already Exist!';
            }
        } catch (exception) {
            signUpResponseModel.statusCode = exception.status;
            signUpResponseModel.reason = exception.statusText;
        }

        return signUpResponseModel;
    }

    public logout() {
        localStorage.removeItem('access_token');

        this.currentUser = null;

        this.currentUserSubject.next(null);
    }
}
