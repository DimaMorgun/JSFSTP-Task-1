import { Controller, Get, Param, Delete, Post, Put, Body, Query } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { UserRoleModel, CreateUserRoleModel, UpdateUserRoleModel } from 'src/models';
import { UserRoleService } from 'src/services';
import { UserRoleDocument } from 'src/documents';

@Controller('userRole')
@ApiUseTags('userRole')
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService,
    ) { }

    @Get(':id')
    public async getUserRoleById(@Param('id') id: string): Promise<UserRoleModel> {
        const userRole: UserRoleModel = await this.userRoleService.getById(id);

        return userRole;
    }

    @Get()
    public async getUserRoleList(): Promise<UserRoleDocument[]> {
        const userRoles: UserRoleDocument[] = await this.userRoleService.getList();

        return userRoles;
    }

    @Post()
    public async createUserRole(@Body() createUserRoleModel: CreateUserRoleModel): Promise<UserRoleModel> {
        const createdUserRole: UserRoleModel = await this.userRoleService.create(createUserRoleModel);

        return createdUserRole;
    }

    @Put()
    public async updateUserRole(@Body() updateUserRoleModel: UpdateUserRoleModel): Promise<UserRoleModel> {
        const updatedUserRole: UserRoleModel = await this.userRoleService.update(updateUserRoleModel);

        return updatedUserRole;
    }

    @Delete(':id')
    public async deleteUserRole(@Param('id') id: string): Promise<UserRoleModel> {
        const isDeleted: UserRoleModel = await this.userRoleService.delete(id);

        return isDeleted;
    }
}
