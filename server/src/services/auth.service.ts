import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserModel, UserPayloadModel } from 'src/models';
import { PasswordHelper } from 'src/common';
import { UserService } from '.';
import { Environment } from 'src/environment/environment';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        @Inject(forwardRef(() => PasswordHelper))
        private readonly passwordHelper: PasswordHelper,
        private readonly jwtService: JwtService,
        private readonly environment: Environment,
    ) { }

    async validateUser(username: string, password: string): Promise<boolean> {
        let user: UserModel = await this.userService.getByUsername(username);

        if (!user || !user.passwordSalt || !user.passwordHash) {
            return false;
        }

        const passwordHash: string = await this.passwordHelper.getPasswordHash(password, user.passwordSalt);

        return user.passwordHash === passwordHash;
    }

    async getToken(username: string) {
        const userPayload: UserPayloadModel = await this.getUserPayload(username);


        const accessToken: string = await this.jwtService.sign(userPayload)

        return accessToken;
    }

    async getUserPayload(username: string): Promise<UserPayloadModel> {
        let user: UserModel = await this.userService.getByUsername(username);

        if (!user) {
            return null;
        }

        const userPayload: UserPayloadModel = {};
        userPayload.id = user.id;
        userPayload.username = user.username;
        userPayload.fullName = user.fullName;
        userPayload.createdDate = user.createdDate;
        userPayload.updatedDate = user.updatedDate;
        userPayload.isDeleted = user.isDeleted;

        return userPayload;
    }
}
