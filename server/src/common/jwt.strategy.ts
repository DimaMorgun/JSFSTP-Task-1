import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Environment } from 'src/environment/environment'
import { AuthService, UserService } from 'src/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly environment: Environment,
        private readonly authService: AuthService,
        private userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: environment.jwtSecretKey,
            secretOrKey: 'secrettKey',
        });
    }

    async validate(username: string, password: string): Promise<boolean> {
        const isUserValid: boolean = await this.authService.validateUser(username, password);

        if (!isUserValid) {
            throw new UnauthorizedException();
        }

        return isUserValid;
    }
}