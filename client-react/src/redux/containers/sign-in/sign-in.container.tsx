import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Title } from "../../../components/layout/title.component";
import { SignInForm } from "../../../components/auth/sign-in-form.component";
import { ResponseBox } from "../../../components/common/response-box.component";

import { AppState, AppProps } from '../../reducers';

import { signInAction, getUserInfoAction } from "../../actions/sign-in.actions";

import { SignInState, SignInPayload, GetUserInfoPayload, } from "../../types/sign-in.types";

import { UserInfoModel } from "../../../shared/models/index";

class SignIn extends Component<any, SignInState> {
    state: SignInState = {
        title: "Sign In Page",
        responseMessage: "",
    }

    handleSignInSuccess = (username: string, token: string) => {
        const { signInAction } = this.props as AppProps;

        const signInPayload: SignInPayload = {
            username,
            token,
        }

        signInAction(signInPayload);

        this.setState({
            responseMessage: "Logged in successfully.",
        });
    }

    handleSignInError = (reason: string) => {
        this.setState({
            responseMessage: `Logged in failed. ${reason}`,
        });
    }

    handleGetUserInformation = (userInfo: UserInfoModel) => {
        const { getUserInfoAction } = this.props;

        const { id, username, userRole, createdDate, updatedDate, isDeleted }: UserInfoModel = userInfo;

        const userInfoPayload: GetUserInfoPayload = {
            id,
            username,
            userRole,
            createdDate,
            updatedDate,
            isDeleted,
        }

        getUserInfoAction(userInfoPayload);

        this.setState({
            responseMessage: JSON.stringify(userInfo),
        });
    }

    render() {
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

const mapStateToProps = (state: AppState) => {
    return {
        signIn: state.signIn,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signInAction: (payload: SignInPayload) => dispatch(signInAction(payload)),
    getUserInfoAction: (payload: GetUserInfoPayload) => dispatch(getUserInfoAction(payload)),
})

//connect function takes 'mapStateToProps' and 'mapDispatchToProps' function
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
