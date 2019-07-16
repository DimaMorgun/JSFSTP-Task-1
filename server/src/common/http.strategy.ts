// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// import { Strategy } from 'passport-http-bearer';

// import { AuthService } from 'src/services';

// @Injectable()
// export class HttpStrategy extends PassportStrategy(Strategy) {
//     constructor(private readonly authService: AuthService) {
//         super();
//     }

//     async validate(username: string, password: string) {
//         const result = await this.authService.validateUser(username, password);
//         if (!result) {
//             throw new UnauthorizedException();
//         }
//         return result;
//     }
// }
