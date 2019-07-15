import { Injectable } from '@nestjs/common';

import { UserDocument } from 'src/documents';
import { UserModel, CreateUserModel, UpdateUserModel } from 'src/models';

@Injectable()
export class UserMapper {
    public getUserDocumentFromCreateUserModel(createUserModel: CreateUserModel): UserDocument {
        const userDocument: UserDocument = {};

        if (createUserModel) {
            userDocument.username = createUserModel.userName;
            userDocument.fullName = createUserModel.fullName;
            userDocument.createdDate = new Date();
            userDocument.updatedDate = new Date();
            userDocument.isDeleted = false;
        }

        return userDocument;
    }

    public getUserDocumentFromUpdateUserModel(updateUserModel: UpdateUserModel): UserDocument {
        const userDocument: UserDocument = {};

        if (updateUserModel) {
            userDocument._id = updateUserModel.id;
            userDocument.username = updateUserModel.username;
            userDocument.fullName = updateUserModel.fullName;
            userDocument.updatedDate = new Date();
        }

        return userDocument;
    }

    public getUserModel(userDocument: UserDocument): UserModel {
        const userModel: UserModel = {};

        if (userDocument) {
            userModel.id = userDocument._id;
            userModel.username = userDocument.username;
            userModel.fullName = userDocument.fullName;
            userModel.passwordSalt = userDocument.passwordSalt;
            userModel.passwordHash = userDocument.passwordHash;
            userModel.createdDate = userDocument.createdDate;
            userModel.updatedDate = userDocument.updatedDate;
            userModel.isDeleted = userDocument.isDeleted;
        }

        return userModel;
    }

    async getUserModels(userDocuments: UserDocument[]): Promise<UserModel[]> {
        const userModels: UserModel[] = new Array<UserModel>();

        if (userDocuments && userDocuments.length > 0) {
            for (const userDocument of userDocuments) {
                const userModel: UserModel = {};
                userModel.id = userDocument._id;
                userModel.username = userDocument.username;
                userModel.fullName = userDocument.fullName;
                userModel.passwordSalt = userDocument.passwordSalt;
                userModel.passwordHash = userDocument.passwordHash;
                userModel.createdDate = userDocument.createdDate;
                userModel.updatedDate = userDocument.updatedDate;
                userModel.isDeleted = userDocument.isDeleted;

                userModels.push(userModel);
            }
        }

        return userModels;
    }
}
