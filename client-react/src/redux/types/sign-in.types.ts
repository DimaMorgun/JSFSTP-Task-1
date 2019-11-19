import { SignInActionsEnum } from "../enums/sign-in-actions.enum";

export interface SignInStoreState {
    username: string;
    token: string;
    userInfo: GetUserInfoPayload;
}

export interface SignInState {
    title: string;
    responseMessage: string;
}

interface SignInAction {
    type: typeof SignInActionsEnum.SIGN_IN;
    payload: SignInPayload;
}

export interface SignInPayload {
    username: string;
    token: string;
}

interface GetUserInfoAction {
    type: typeof SignInActionsEnum.GET_USER_INFO;
    userInfo: GetUserInfoPayload;
}

export interface GetUserInfoPayload {
    id: string;
    username: string;
    userRole: string;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: boolean,
}

export type SignInActionTypes = SignInAction | GetUserInfoAction;