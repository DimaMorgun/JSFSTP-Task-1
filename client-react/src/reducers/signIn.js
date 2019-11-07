import { SIGN_IN } from "../constants";

const INITIAL_STATE = {
    username: 'Test User.',
    token: "Invalid Token.",
}

export const signIn = (state = INITIAL_STATE, { type, username, token }) => {
    switch (type) {
        case SIGN_IN:
            return { ...state, ...{ username, token } };
        default:
            return state;
    }
}