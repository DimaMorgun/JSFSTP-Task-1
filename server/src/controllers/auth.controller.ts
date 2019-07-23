import { Controller, Post, UseGuards, Request, Get, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { LoginModel, UserPayloadModel } from 'src/models';
import { RolesGuard } from 'src/common/roles.guard';
import { UserRole } from 'src/constants';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Body() request: LoginModel): Promise<LoginModel> {
        request.token = await this.authService.getToken(request.username);

        return request;
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('me')
    public async getProfile(@Request() req): Promise<UserPayloadModel> {
        return req.user;
    }

    @UseGuards(new RolesGuard())
    @SetMetadata('userRole', [UserRole.admin])
    @ApiBearerAuth()
    @Get('admin/me')
    public async getAdminProfile(@Request() req): Promise<string> {
        return 'You are admin';
    }
}
