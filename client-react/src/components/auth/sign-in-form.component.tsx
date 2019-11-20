import React, { Component } from "react";

import { SignInFormProps, SignInFormState } from "../../types/index"

const API_ENDPOINT = "https://localhost";
const AUTH_CONTROLLER_PATH = "auth";
const LOGIN_ACTION_PATH = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH = "me";

export class SignInForm extends Component<SignInFormProps, SignInFormState> {
    state: SignInFormState = {
        username: "",
        password: "",
    };

    handleUsernameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { value } = event.currentTarget;
        const currentState: SignInFormState = this.state;

        currentState.username = value;

        this.setState(currentState);
    }

    handlePasswordChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const { value } = event.currentTarget;
        const currentState: SignInFormState = this.state;

        currentState.password = value;

        this.setState(currentState);
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const { onSignInSuccess, onSignInError } = this.props;
        const { username, password } = this.state;

        const singInModel = {
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
                    onSignInSuccess(username, token);
                }
                if (!token) {
                    onSignInError("Invalid credentials.");
                }
            })
            .catch(error => {
                onSignInError("Some error occured.", error);
            })
            .finally(() => {
                this.setState({ password: "" });
            })
    }

    handleClick = (): void => {
        const { token, onGetUserInformation, onSignInError } = this.props;

        const getMeRoute = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGGED_IN_USER_INFORMATION_ACTION_PATH}`;
        fetch(getMeRoute, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(response => {
                onGetUserInformation(response);
            })
            .catch(error => {
                onSignInError("Some error occured.", error);
            })
    }

    render() {
        return (
            <div>
                <p>SignIn - Form</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} />
                    <br />
                    <input type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <br />
                    <input type="submit" value="Submit" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="My Info" onClick={this.handleClick} />
                </form>
            </div>
        );
    }
}
