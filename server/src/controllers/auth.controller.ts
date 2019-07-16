import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { LoginModel } from 'src/models';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Body() request: LoginModel): Promise<LoginModel> {
        request.token = await this.authService.getToken(request.username);

        return request;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
