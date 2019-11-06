import React, { Component, ReactElement } from "react";
import { connect } from "react-redux";

import { getToken } from "../../actions/actionCreator";

import { Title } from "../../components/layout/title";
import { SignInForm } from "../../components/auth/signInForm";
import { ResponseBox } from "../../components/common/responseBox";

interface SignInProps {
    token: string;
}

interface SignInState {
    title: string;
    username: string;
    token: string;
    responseMessage: string;
}

export class SignIn extends Component<{}, SignInState> {
    state = {
        title: "Sign In Page",
        username: "",
        token: "",
        responseMessage: "",

    }

    handleSignInSuccess = (token: string) => {
        const { getToken }: any = this.props;

        getToken(token);

        this.setState({
            token: token,
        })
    }

    render(): ReactElement {
        const { title, username, responseMessage } = this.state;
        // const { token } = this.props;

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm onSignInSuccess={this.handleSignInSuccess} />
                <ResponseBox responseMessage={responseMessage} />
            </div>
        );
    }
}

export default connect(state => ({
    token: state.token,
}), { getToken })(SignIn);