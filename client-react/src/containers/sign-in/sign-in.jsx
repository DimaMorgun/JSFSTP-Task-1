import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Title } from "../../components/layout/Title";
import { SignInForm } from "../../components/auth/sign-in-form";
import { ResponseBox } from "../../components/common/response-box";

import { signIn, getUserInfo } from "../../actions/actionCreator";

class SignIn extends Component {
    state = {
        title: "Sign In Page",
        responseMessage: "",
    }

    handleSignInSuccess = (username, token) => {
        const { signIn } = this.props;

        signIn(username, token);

        this.setState({
            responseMessage: "Logged in successfully.",
        });
    }

    handleSignInError = (reason) => {
        this.setState({
            responseMessage: `Logged in failed. ${reason}`,
        });
    }

    handleGetUserInformation = userInfo => {
        const { getUserInfo } = this.props;

        getUserInfo(userInfo);

        this.setState({
            responseMessage: JSON.stringify(userInfo),
        });
    }

    render() {
        const { handleSignInSuccess, handleSignInError, handleGetUserInformation } = this;
        const { username, token } = this.props;
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

const mapStateToProps = state => {
    const { username, token, userInfo } = state.signIn;

    return { username, token, userInfo };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         signIn: () => dispatch({ type: SIGN_IN }),
//     }
// }

//connect function takes 'mapStateToProps' and 'mapDispatchToProps' function
export default connect(mapStateToProps, { signIn, getUserInfo })(SignIn);