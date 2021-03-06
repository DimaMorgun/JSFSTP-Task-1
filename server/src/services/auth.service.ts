import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserModel, UserPayloadModel, LoginModel } from 'src/models';
import { Encryptor } from 'src/common';
import { UserService } from '.';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => Encryptor))
        private readonly passwordHelper: Encryptor,
        private readonly jwtService: JwtService,
    ) { }

    public async validateUser(username: string, password: string): Promise<boolean> {
        const user: UserModel = await this.userService.getByUsername(username);

        if (!user || !user.passwordSalt || !user.passwordHash) {
            return false;
        }

        const passwordHash: string = await this.passwordHelper.getSaltedHash(password, user.passwordSalt);

        return user.passwordHash === passwordHash;
    }

    public async getToken(loginModel: LoginModel): Promise<string> {
        const isUserCredentialsValid: boolean = await this.validateUser(loginModel.username, loginModel.password);
        if (!isUserCredentialsValid) {
            return '';
        }

        const userPayload: UserPayloadModel = await this.getUserPayload(loginModel.username);

        const accessToken: string = await this.jwtService.sign(userPayload);

        return accessToken;
    }

    public async getUserPayload(username: string): Promise<UserPayloadModel> {
        const user: UserModel = await this.userService.getByUsername(username);

        if (!user) {
            return null;
        }

        const userPayload: UserPayloadModel = {};
        userPayload.id = user.id;
        userPayload.username = user.username;
        userPayload.fullname = user.fullname;
        userPayload.userRole = user.userRole;
        userPayload.createdDate = user.createdDate;
        userPayload.updatedDate = user.updatedDate;
        userPayload.isDeleted = user.isDeleted;

        return userPayload;
    }
}
