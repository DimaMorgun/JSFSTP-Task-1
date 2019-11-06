// import { GET_TOKEN } from "../constants";

// export const getToken = (token: string) => ({
//     type: GET_TOKEN,
//     token,
// })

import { action } from "typesafe-actions";

import { UserInformationModel } from "../models/userInformationModel";

enum actionTypes {
    GET_TOKEN = "GET_TOKEN",
    GET_LOGGED_IN_USER_INFORMATION = "GET_LOGGED_IN_USER_INFORMATION"
}

export const { GET_TOKEN, GET_LOGGED_IN_USER_INFORMATION } = actionTypes;

export const signInActions = {
    getToken: (token: string) => action(GET_TOKEN, token),
    getLoggedInUserInformation: (userInformationModel: UserInformationModel) => action(GET_LOGGED_IN_USER_INFORMATION, userInformationModel),
}

export default actionTypes;