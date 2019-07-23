import { Injectable, CanActivate, ExecutionContext, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard implements CanActivate {

    @UseGuards(AuthGuard('jwt'))
    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // tslint:disable-next-line:no-console
        console.log(context);

        return true;
    }
}
