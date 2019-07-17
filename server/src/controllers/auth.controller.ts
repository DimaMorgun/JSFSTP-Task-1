import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { LoginModel, UserPayloadModel } from 'src/models';

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
    @Get('me')
    @ApiBearerAuth()
    public async getProfile(@Request() req): Promise<UserPayloadModel> {
        return req.user;
    }
}
