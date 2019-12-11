import React, { Component, ReactElement } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Title } from "../../components/layout/title.component";
import { SignInForm } from "../../components/auth/sign-in-form.component";
import { ResponseBox } from "../../components/common/response-box.component";

import { signInAction, getUserInfoAction } from "../actions/sign-in.actions";

import { AppState, AppProps } from '../reducers';

import { SignInState, SignInPayload, GetUserInfoPayload, } from "../types/sign-in.types";

import { UserInfoModel } from "../../shared/models";

import { SignInModel } from '../../types';

const API_ENDPOINT = "https://localhost";
const AUTH_CONTROLLER_PATH = "auth";
const LOGIN_ACTION_PATH = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH = "me";

class SignIn extends Component<AppProps, SignInState> {
    state: SignInState = {
        title: "Sign In Page",
        responseMessage: "",
    }

    handleSignIn = (username: string, password: string): boolean => {
        debugger;

        const singInModel: SignInModel = {
            username,
            password,
        };
        const requestJsonData = JSON.stringify(singInModel);

        const loginRoute = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGIN_ACTION_PATH}`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: requestJsonData,
        })
            .then(response => response.json())
            .then(({ token }) => {
                if (token) {
                    this.onSignInSuccess(username, token);
                }
                if (!token) {
                    this.onSignInError("Invalid credentials");
                }
            })
            .catch(error => {
                this.onSignInError("Some error occured", error);
                return false;
            })

        return true;
    }

    onSignInSuccess = (username: string, token: string) => {
        const signInPayload: SignInPayload = {
            username,
            token,
        }

        this.props.signInAction(signInPayload);

        const responseMessage: string = "Logged in successfully.";
        this.setState({ responseMessage });
    }

    onSignInError = (reason: string, error?: string) => {
        const responseMessage: string = `Logged in failed. ${reason}. Error: ${error}`;

        this.setState({ responseMessage });
    }

    handleGetUserInformation = (): boolean => {
        const getMeRoute = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGGED_IN_USER_INFORMATION_ACTION_PATH}`;

        fetch(getMeRoute, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.props.signIn.token}` },
        })
            .then(response => response.json())
            .then((response: UserInfoModel) => {
                this.onGetUserInformationSuccess(response);
            })
            .catch(error => {
                this.onSignInError("Some error occured", error);

                return false;
            })

        return true;
    }

    onGetUserInformationSuccess = (userInfo: UserInfoModel) => {
        const { id, username, userRole, createdDate, updatedDate, isDeleted }: UserInfoModel = userInfo;

        const userInfoPayload: GetUserInfoPayload = {
            id,
            username,
            userRole,
            createdDate,
            updatedDate,
            isDeleted,
        }

        this.props.getUserInfoAction(userInfoPayload);

        const responseMessage: string = JSON.stringify(userInfo);
        this.setState({ responseMessage });
    }

    render(): ReactElement {
        const { handleSignIn, handleGetUserInformation } = this;
        const { username, token } = this.props.signIn;
        const { title, responseMessage } = this.state;

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm onSignIn={handleSignIn} onGetUserInformation={handleGetUserInformation} token={token} />
                <ResponseBox responseMessage={responseMessage} />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState): AppState => {
    return state;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signInAction: (payload: SignInPayload) => dispatch(signInAction(payload)),
    getUserInfoAction: (payload: GetUserInfoPayload) => dispatch(getUserInfoAction(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
