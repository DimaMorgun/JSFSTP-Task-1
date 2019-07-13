import { Injectable } from '@nestjs/common';

// import { UserService } from 'src/services';

@Injectable()
export class AuthService {
    // constructor(private readonly userService: UserService) { }

    async validateUser(token: string): Promise<boolean> {
        // const result: boolean = await this.usersService.findOneByToken(token);

        // return result;
        return true;
    }
}
