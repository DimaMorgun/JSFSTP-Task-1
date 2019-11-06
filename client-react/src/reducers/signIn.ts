// import { GET_TOKEN } from "../constants";

// const token = (state: any = {}, { token, type }: any) => {
//     switch (type) {
//         case GET_TOKEN:
//             return { ...state, ...{ token } };
//         default:
//             return state;
//     }
// }

// export default token;

import GET_TOKEN from "../actions/actionCreator"

interface ActionGetToken {
    type: GET_TOKEN,
    payload: string
}

interface ActionGetLoggedInUserInformation {
    type: "DELETE",
    payload: number
}

type Actions = ActionGetToken | ActionGetLoggedInUserInformation

