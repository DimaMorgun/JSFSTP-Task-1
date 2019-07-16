import { Controller, Get, Param, Delete, Post, Put, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';
import { UserService } from 'src/services';

@Controller('user')
@ApiUseTags('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        const user: UserModel = await this.userService.getById(id);

        return user;
    }

    @Get(':skip/:limit')
    async getUserListWithPaging(@Param('skip') skip: string, @Param('limit') limit: string): Promise<UserModel[]> {
        const users: UserModel[] = await this.userService.getPaginated(+skip, +limit);

        return users;
    }

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

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        const isDeleted: UserModel = await this.userService.delete(id);

        return isDeleted;
    }
}
