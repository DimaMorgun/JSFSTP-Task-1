import { SignInActionsEnum } from "../enums/sign-in-actions.enum";

import { SignInActionTypes, SignInStoreState, GetUserInfoPayload } from "../types/sign-in.types"

const INITIAL_STATE: SignInStoreState = {
    username: "",
    token: "",
    userInfo: {} as GetUserInfoPayload,
}

const signInReducer = (
    state: SignInStoreState = INITIAL_STATE,
    action: SignInActionTypes
): SignInStoreState => {
    switch (action.type) {
        case SignInActionsEnum.SIGN_IN:
            const signInAction = action;

            const { username, token } = signInAction.payload;
            return { ...state, ...{ username, token } };
        case SignInActionsEnum.GET_USER_INFO:
            const getUserInfoAction = action;

            const { userInfo } = getUserInfoAction;
            return { ...state, ...{ userInfo } };
        default:
            return state;
    }
}

export default signInReducer;