import { SIGN_IN, GET_USER_INFO } from "../constants";

export const signIn = (username, token) => ({
    type: SIGN_IN,
    username,
    token,
});

export const getUserInfo = (userInfo) => ({
    type: GET_USER_INFO,
    userInfo,
});
