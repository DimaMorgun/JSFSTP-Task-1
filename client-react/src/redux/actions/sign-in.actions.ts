import { SignInActionsEnum } from "../enums/sign-in-actions.enum";

import { SignInPayload, GetUserInfoPayload, SignInActionTypes } from "../types/sign-in.types"

export const signInAction = (payload: SignInPayload): SignInActionTypes => {
    return {
        type: SignInActionsEnum.SIGN_IN,
        payload,
    }
};

export const getUserInfoAction = (userInfo: GetUserInfoPayload): SignInActionTypes => {
    return {
        type: SignInActionsEnum.GET_USER_INFO,
        userInfo,
    }
};
