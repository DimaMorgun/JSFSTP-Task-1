import { SIGN_IN, GET_USER_INFO } from "../constants";

const INITIAL_STATE = {
    username: 'Test User.',
    token: "Invalid Token.",
    userInfo: {},
}

const signIn = (state = INITIAL_STATE, { type, username, token, userInfo }) => {
    switch (type) {
        case SIGN_IN:
            return { ...state, ...{ username, token } };
        case GET_USER_INFO:
            return { ...state, ...{ userInfo } };
        default:
            return state;
    }
}

export default signIn;