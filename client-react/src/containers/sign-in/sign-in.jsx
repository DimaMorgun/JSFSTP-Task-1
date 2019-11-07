import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from "../../actions/actionCreator";

import { Title } from "../../components/layout/Title";
import { SignInForm } from "../../components/auth/sign-in-form";
import { ResponseBox } from "../../components/common/response-box";

export class SignIn extends Component {
    state = {
        title: "Sign In Page",
        responseMessage: "",
    }

    handleSignInSuccess = token => {
        this.setState({
            token,
        });
    }

    handleGetUserInformation = username => {
        this.setState({
            username,
        });
    }

    signIn = ({ key }) => {
        const { taskText } = this.state;

        if (taskText.length > 3 && key === 'Enter') {
            const { addTast } = this.props;

            addTast((new Date()).getTime(), taskText, false);

            this.setState({
                taskText: '',
            })

        }

    }

    render() {
        const { title, responseMessage } = this.state;
        const { username } = this.props;

        console.log("state", this.state);
        console.log("props", this.props);

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm onSignInSuccess={this.handleSignInSuccess} onGetUserInformation={this.handleGetUserInformation} />
                <ResponseBox responseMessage={responseMessage} />
            </div>
        );
    }
}

//connect function takes 'MapStateToProps' function
export default connect(state => ({
    username: state.username,
    token: state.token,
}), { signIn })(SignIn);