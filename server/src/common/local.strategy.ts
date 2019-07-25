import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthService } from 'src/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
    ) {
        super();
    }

    public async validate(username: string, password: string): Promise<boolean> {
        const isUserValid: boolean = await this.authService.validateUser(username, password);

        if (!isUserValid) {
            throw new UnauthorizedException();
        }

        return isUserValid;
    }
}
