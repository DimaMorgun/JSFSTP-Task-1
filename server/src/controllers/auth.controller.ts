import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { AuthService } from 'src/services';
import { LoginModel, UserPayloadModel } from 'src/models';
import { UserRole } from 'src/enums';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/common';

@UseGuards(RolesGuard)
@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    public async login(@Body() loginModel: LoginModel): Promise<LoginModel> {
        loginModel.token = await this.authService.getToken(loginModel);

        return loginModel;
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
