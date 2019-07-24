import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.headers.authorization;
    if (!authorizationHeader) {
      return false;
    }

    const token: string = authorizationHeader.replace('Bearer ', '');
    const payload = this.jwtService.decode(token);
    // tslint:disable-next-line:no-string-literal
    const userRole = payload['userRole'];
    const hasRole: boolean = roles.includes(userRole);

    return hasRole;
  }
}
