import { Injectable } from '@nestjs/common';

import { Model, objectid } from 'mongoose';

import { UserRoleDocument, UserRoleSchema } from 'src/documents';

import * as mongoose from 'mongoose';

@Injectable()
export class UserRoleRepository {
    private readonly userRoleModel: Model<UserRoleDocument>;

    constructor() {
        this.userRoleModel = mongoose.model('UserRole', UserRoleSchema);
    }

    public async getById(id: objectid): Promise<UserRoleDocument> {
        const userRole: UserRoleDocument = await this.userRoleModel.findById(id).exec();

        return userRole;
    }

    public async getAll(): Promise<UserRoleDocument[]> {
        const userRoles: UserRoleDocument[] = await this.userRoleModel.find().exec();

        return userRoles;
    }

    public async create(createUserRole: UserRoleDocument): Promise<UserRoleDocument> {
        const createdUserRole: Model<UserRoleDocument> = new this.userRoleModel(createUserRole);
        const newUserRole: UserRoleDocument = createdUserRole.save();

        return newUserRole;
    }

    public async update(updateUserRole: UserRoleDocument): Promise<UserRoleDocument> {
        const updatedUserRole: UserRoleDocument = await this.userRoleModel.findByIdAndUpdate(updateUserRole._id, updateUserRole);

        return updatedUserRole;
    }

    public async delete(id: objectid): Promise<UserRoleDocument> {
        const deletedUserRole: UserRoleDocument = await this.userRoleModel.findByIdAndRemove(id);

        return deletedUserRole;
    }
}
