import { Injectable } from '@nestjs/common';

import { Types } from 'mongoose';

import { UserRoleRepository } from 'src/repositories';
import { UserRoleModel, CreateUserRoleModel, UpdateUserRoleModel } from 'src/models';
import { UserRoleDocument } from 'src/documents';

@Injectable()
export class UserRoleService {
    constructor(
        private readonly userRoleRepository: UserRoleRepository,
    ) { }

    public async getById(id: string): Promise<UserRoleModel> {
        const userRole: UserRoleModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return userRole;
        }

        const userRoleDocument: UserRoleDocument = await this.userRoleRepository.getById(id);
        if (userRoleDocument) {
            userRole.id = userRoleDocument._id;
            userRole.name = userRoleDocument.name;
            userRole.createdDate = userRoleDocument.createdDate;
            userRole.updatedDate = userRoleDocument.updatedDate;
            userRole.isDeleted = userRoleDocument.isDeleted;
        }

        return userRole;
    }

    public async getList(): Promise<UserRoleModel[]> {
        const userRoles: UserRoleModel[] = new Array<UserRoleModel>();

        const userRoleDocuments: UserRoleDocument[] = await this.userRoleRepository.getAll();
        if (!userRoleDocuments || userRoleDocuments.length === 0) {
            return userRoles;
        }

        for (const userRoleDocument of userRoleDocuments) {
            const userRoleModel: UserRoleModel = {};
            userRoleModel.id = userRoleDocument._id;
            userRoleModel.name = userRoleDocument.name;
            userRoleModel.createdDate = userRoleDocument.createdDate;
            userRoleModel.updatedDate = userRoleDocument.updatedDate;
            userRoleModel.isDeleted = userRoleDocument.isDeleted;

            userRoles.push(userRoleModel);
        }

        return userRoles;
    }

    public async create(createUserRoleModel: CreateUserRoleModel): Promise<UserRoleModel> {
        const createdUserRole: UserRoleModel = {};
        const createUserRoleDocument: UserRoleDocument = {};

        if (createUserRoleModel) {
            createUserRoleDocument.name = createUserRoleModel.name;
            createUserRoleDocument.createdDate = new Date();
            createUserRoleDocument.updatedDate = new Date();
            createUserRoleDocument.isDeleted = false;
        }

        const createdUserRoleDocument: UserRoleDocument = await this.userRoleRepository.create(createUserRoleDocument);
        if (createdUserRoleDocument) {
            createdUserRole.id = createdUserRoleDocument._id;
            createdUserRole.name = createdUserRoleDocument.name;
            createdUserRole.createdDate = createdUserRoleDocument.createdDate;
            createdUserRole.updatedDate = createdUserRoleDocument.updatedDate;
            createdUserRole.isDeleted = createdUserRoleDocument.isDeleted;
        }

        return createdUserRole;
    }

    public async update(updateUserRoleModel: UpdateUserRoleModel): Promise<UserRoleModel> {
        const updatedUserRole: UserRoleModel = {};
        const updateUserRoleDocument: UserRoleDocument = {};

        if (updateUserRoleModel) {
            updateUserRoleDocument._id = updateUserRoleModel.id;
            updateUserRoleDocument.name = updateUserRoleModel.name;
            updateUserRoleDocument.updatedDate = new Date();
        }

        const updatedUserRoleDocument: UserRoleDocument = await this.userRoleRepository.update(updateUserRoleDocument);
        if (updatedUserRoleDocument) {
            updatedUserRole.id = updatedUserRoleDocument._id;
            updatedUserRole.name = updatedUserRoleDocument.name;
            updatedUserRole.createdDate = updatedUserRoleDocument.createdDate;
            updatedUserRole.updatedDate = updatedUserRoleDocument.updatedDate;
            updatedUserRole.isDeleted = updatedUserRoleDocument.isDeleted;
        }

        return updatedUserRole;
    }

    public async delete(id: string): Promise<UserRoleModel> {
        const deletedUserRole: UserRoleModel = {};

        const isValidId: boolean = Types.ObjectId.isValid(id);
        if (!isValidId) {
            return deletedUserRole;
        }

        const deletedUserRoleDocument: UserRoleDocument = await this.userRoleRepository.delete(id);
        if (deletedUserRoleDocument) {
            deletedUserRole.id = deletedUserRoleDocument._id;
            deletedUserRole.name = deletedUserRoleDocument.name;
            deletedUserRole.createdDate = deletedUserRoleDocument.createdDate;
            deletedUserRole.updatedDate = deletedUserRoleDocument.updatedDate;
            deletedUserRole.isDeleted = deletedUserRoleDocument.isDeleted;
        }

        return deletedUserRole;
    }
}
