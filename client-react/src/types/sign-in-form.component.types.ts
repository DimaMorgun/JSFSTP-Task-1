export interface SignInFormProps {
    token: string;
    onSignIn: (username: string, password: string) => boolean;
    onGetUserInformation: () => boolean;
}

export interface SignInFormState {
    username: string;
    password: string;
    isPasswordHidden: boolean;
}

export interface SignInModel {
    username: string;
    password: string;
}