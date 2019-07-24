import { Controller, Get, Param, Delete, Post, Put, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserService } from 'src/services';
import { RolesGuard } from 'src/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from 'src/enums';

@Controller('user')
@ApiUseTags('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        const user: UserModel = await this.userService.getById(id);

        return user;
    }

    @Roles(UserRole.admin)
    @ApiBearerAuth()
    @Get(':skip/:limit')
    async getUserListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<UserModel[]> {
        const users: UserModel[] = await this.userService.getPaginated(+skip, +limit);

        return users;
    }

    @Roles(UserRole.admin)
    @ApiBearerAuth()
    @Get()
    async getUserList(): Promise<UserModel[]> {
        const users: UserModel[] = await this.userService.getList();

        return users;
    }

    @Post()
    async createUser(@Body() createUserModel: CreateUserModel): Promise<UserModel> {
        const createdUser: UserModel = await this.userService.create(createUserModel);

        return createdUser;
    }

    @Put()
    async updateUser(@Body() updateUserModel: UpdateUserModel): Promise<UserModel> {
        const updatedUser: UserModel = await this.userService.update(updateUserModel);

        return updatedUser;
    }

    @Roles(UserRole.admin)
    @ApiBearerAuth()
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        const isDeleted: UserModel = await this.userService.delete(id);

        return isDeleted;
    }
}
