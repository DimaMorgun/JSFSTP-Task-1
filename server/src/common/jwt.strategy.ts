import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { Environment } from 'src/environment';
import { UserPayloadModel } from 'src/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Environment.jwtSecretKey,
        });
    }

    public async validate(payload: UserPayloadModel): Promise<UserPayloadModel> {
        return payload;
    }
}
