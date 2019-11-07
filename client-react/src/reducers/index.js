import { combineReducers } from "redux";
import { signIn } from "./signIn";

const rootReducer = combineReducers({ signIn });

export default rootReducer;