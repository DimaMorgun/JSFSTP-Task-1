import { SIGN_IN } from "../constants";

export const signIn = (username, token) => ({
    type: SIGN_IN,
    username,
    token,
})