export interface UserModel {
    id?: string;
    username?: string;
    fullName?: string;
    userRole?: string;
    token?: string;
    createdDate?: Date;
    updatedDate?: Date;
    isDeleted?: boolean;
}
