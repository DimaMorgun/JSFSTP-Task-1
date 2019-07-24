import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { environment, Environment } from 'src/environment';
import { UserPayloadModel } from 'src/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const env: Environment = environment();

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.jwtSecretKey,
        });
    }

    public async validate(payload: UserPayloadModel): Promise<UserPayloadModel> {
        return payload;
    }
}
