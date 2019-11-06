import React, { Component, FormEvent, ReactElement } from "react";

const API_ENDPOINT: string = "https://localhost";
const AUTH_CONTROLLER_PATH: string = "auth";
const LOGIN_ACTION_PATH: string = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH: string = "me";
const TEST_ADMIN_ACTION_PATH: string = "admin/test";

export interface SignInFormProps {
    onSignInSuccess: Function;
}

interface SignInFormState {
    username: string;
    password: string;
}

interface SignInModel {
    username?: string;
    password?: string;
}

export class SignInForm extends Component<SignInFormProps, SignInFormState> {
    state: SignInFormState = {
        username: "",
        password: "",
    };

    handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: event.target.value,
        });
    }

    handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value,
        });
    }

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const singInModel: SignInModel = {};
        singInModel.username = this.state.username;
        singInModel.password = this.state.password;
        const requestJsonData: string = JSON.stringify(singInModel);

        const loginRoute: string = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGIN_ACTION_PATH}`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: requestJsonData,
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.token) {
                    this.props.onSignInSuccess(responseJson.token);
                    // this.setState({ token: responseJson.token, textareaContent: responseJson.token });
                }
                if (!responseJson.token) {
                    // this.setState({ textareaContent: "Invalid credentials." });
                }
            })
            .catch(error => {
                console.log("error", error);
            })
    }

    handleClick = () => {
        const getMeRoute: string = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGGED_IN_USER_INFORMATION_ACTION_PATH}`;
        fetch(getMeRoute, {
            // headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.state.token}` },
        })
            .then(response => response.json())
            .then(response => {
                const responseJsonData: string = JSON.stringify(response);
                // this.setState({ textareaContent: responseJsonData });
            })
            .catch(error => {
                console.log("error", error);
            })
    }

    render(): ReactElement {
        return (
            <div>
                <p>SignIn - Form</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="username" id="username" onChange={this.handleUsernameChange} />
                    <br />
                    <input type="password" id="password" onChange={this.handlePasswordChange} />
                    <br />
                    <input type="submit" value="Submit" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="My Info" onClick={this.handleClick} />
                </form>
            </div>
        );
    }
}