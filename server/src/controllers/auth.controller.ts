import { Controller, Post, UseGuards, Request, Get, Body, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { LoginModel, UserPayloadModel } from 'src/models';
import { UserRole } from 'src/constants';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common';

@UseGuards(RolesGuard)
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

    @Roles(UserRole.admin)
    @ApiBearerAuth()
    @Get('admin/test')
    public async getAdminProfile(@Request() req): Promise<string> {
        return 'You are admin';
    }
}
