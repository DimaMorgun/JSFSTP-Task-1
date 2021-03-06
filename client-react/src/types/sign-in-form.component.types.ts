export interface SignInFormProps {
    token: string;
    onSignInSuccess: Function;
    onSignInError: Function;
    onGetUserInformation: Function;
}

export interface SignInFormState {
    username: string;
    password: string;
}

export interface SignInModel {
    username: string;
    password: string;
}