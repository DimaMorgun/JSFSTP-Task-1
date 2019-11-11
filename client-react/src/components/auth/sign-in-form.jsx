import React, { Component } from "react";

const API_ENDPOINT = "https://localhost";
const AUTH_CONTROLLER_PATH = "auth";
const LOGIN_ACTION_PATH = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH = "me";

export class SignInForm extends Component {
    state = {
        username: "",
        password: "",
    };

    handleChange = (event) => {
        const { id, value } = event.target;

        this.setState({
            [id]: value,
        });
    }

    handleSubmit = (event) => {
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
    }

    handleClick = () => {
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
                    <input type="username" id="username" onChange={this.handleChange} />
                    <br />
                    <input type="password" id="password" onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Submit" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="My Info" onClick={this.handleClick} />
                </form>
            </div>
        );
    }
}