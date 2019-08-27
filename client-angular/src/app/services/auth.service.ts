import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import * as jwtDecode from 'jwt-decode';

import {
    LoginRequestModel,
    LoginResponseModel,
    UserModel,
    SignUpRequestModel,
    BaseResponseModel,
} from 'src/app/shared/models';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    private endpointUrl = `${environment.apiHttpsRoute}:${environment.apiHttpsPort}`;
    private loginAction = `${this.endpointUrl}/auth/login`;
    private signUpAction = `${this.endpointUrl}/user`;
    private userAlreadyExistMessage = 'User Already Exist!';
    private somethingWentWrongMessage = 'Something went wrong!';
    private invalidCredentialsMessage = 'Invalid credentials!';

    public currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: UserModel;

    constructor(
        private http: HttpClient,
    ) {
        this.currentUser = this.getUserSession();
        this.currentUserSubject = new BehaviorSubject<UserModel>(this.currentUser);
    }

    public getUserSession(): UserModel {
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

    public isUserAuthenticated() {
        const currentUser: UserModel = this.getUserSession();

        if (currentUser) {
            return true;
        }

        return false;
    }

    public async login(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
        const loginResponseModel: LoginResponseModel = await this.getToken(loginRequestModel);

        if (loginResponseModel.status) {
            this.setSession(loginResponseModel.token);

            this.currentUser = jwtDecode(loginResponseModel.token);
            this.currentUser.token = loginResponseModel.token;

            this.currentUserSubject.next(this.currentUser);
        }
        if (!loginResponseModel.status) {
            loginResponseModel.errorMessage = this.invalidCredentialsMessage;
        }

        return loginResponseModel;
    }

    public async getToken(loginRequestModel: LoginRequestModel): Promise<LoginResponseModel> {
        let responseModel: LoginResponseModel = {};

        try {
            responseModel = await this.http.post<LoginResponseModel>(this.loginAction, loginRequestModel).toPromise();
            responseModel.status = Boolean(responseModel.token && responseModel.token.trim());

            if (!responseModel.status) {
                responseModel.errorMessage = this.invalidCredentialsMessage;
            }
        } catch {
            responseModel.status = false;
            responseModel.errorMessage = this.somethingWentWrongMessage;
        }

        return responseModel;
    }

    private setSession(token) {
        localStorage.setItem('access_token', token);
    }

    public async signUp(signUpRequestModel: SignUpRequestModel): Promise<BaseResponseModel> {
        const responseModel: BaseResponseModel = {
            status: true,
        };

        try {
            const user: UserModel = await this.http.post<UserModel>(this.signUpAction, signUpRequestModel).toPromise();
            const isUserEmpty: boolean = Object.entries(user).length === 0 && user.constructor === Object;

            if (isUserEmpty) {
                responseModel.status = false;
                responseModel.errorMessage = this.userAlreadyExistMessage;
            }
        } catch {
            responseModel.status = false;
            responseModel.errorMessage = this.somethingWentWrongMessage;
        }

        return responseModel;
    }

    public logout() {
        localStorage.removeItem('access_token');

        this.currentUser = null;

        this.currentUserSubject.next(null);
    }
}
