import { combineReducers } from "redux";
import signIn from "./sign-in.reducer";

const rootReducer = combineReducers({ signIn });

export default rootReducer;
