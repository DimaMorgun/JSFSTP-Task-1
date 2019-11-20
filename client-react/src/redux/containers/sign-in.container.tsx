import React, { Component, ReactElement } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Title } from "../../components/layout/title.component";
import { SignInForm } from "../../components/auth/sign-in-form.component";
import { ResponseBox } from "../../components/common/response-box.component";

import { signInAction, getUserInfoAction } from "../actions/sign-in.actions";

import { AppState, AppProps } from '../reducers';

import { SignInState, SignInPayload, GetUserInfoPayload, } from "../types/sign-in.types";

import { UserInfoModel } from "../../shared/models/index";

class SignIn extends Component<AppProps, SignInState> {
    state: SignInState = {
        title: "Sign In Page",
        responseMessage: "",
    }

    handleSignInSuccess = (username: string, token: string) => {
        const signInPayload: SignInPayload = {
            username,
            token,
        }

        this.props.signInAction(signInPayload);

        const responseMessage: string = "Logged in successfully.";
        this.setState({ responseMessage });
    }

    handleSignInError = (reason: string) => {
        const responseMessage: string = `Logged in failed. ${reason}`;

        this.setState({ responseMessage });
    }

    handleGetUserInformation = (userInfo: UserInfoModel) => {
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
        const { handleSignInSuccess, handleSignInError, handleGetUserInformation } = this;
        const { username, token } = this.props.signIn;
        const { title, responseMessage } = this.state;

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm onSignInSuccess={handleSignInSuccess} onSignInError={handleSignInError} onGetUserInformation={handleGetUserInformation} token={token} />
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
