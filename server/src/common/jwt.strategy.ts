import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Environment } from 'src/environment/environment'
import { AuthService } from 'src/services';
import { UserPayloadModel } from 'src/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Environment.jwtSecretKey,
        });
    }

    async validate(payload: UserPayloadModel): Promise<UserPayloadModel> {
        return payload;
    }
}