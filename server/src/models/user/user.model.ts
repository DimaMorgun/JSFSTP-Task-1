export interface UserModel {
    id?: string;
    fullName?: string;
    username?: string;
    passwordHash?: string;
    passwordSalt?: string;
    createdDate?: Date;
    updatedDate?: Date;
    userRole?: string;
    isDeleted?: boolean;
}
