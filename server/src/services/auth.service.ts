import { Injectable } from '@nestjs/common';

import { UserService } from 'src/services';
import { UserModel } from 'src/models';

@Injectable()
export class AuthService {
    constructor(
        // private userService: UserService,
    ) { }

    async validateUser(username: string, password: string): Promise<boolean> {
        // const user: UserModel = await this.userService.getByUsername(username);

        // if (user) {
        //     const hashedPassword: string = await this.userService.getPasswordHash(password, user.passwordSalt);

        //     return user.passwordHash === hashedPassword;
        // }

        return false;
    }
}
