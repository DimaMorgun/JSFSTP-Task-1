import { combineReducers } from "redux";

import signInReducer from "./sign-in.reducer";

import { SignInStoreState } from "../types";
import { signInAction, getUserInfoAction } from "../actions";

export const rootReducer = combineReducers({
    signIn: signInReducer,
});

export interface AppProps {
    signInAction: typeof signInAction
    getUserInfoAction: typeof getUserInfoAction
    signIn: SignInStoreState,
}

export type AppState = ReturnType<typeof rootReducer>;
