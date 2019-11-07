import React, { Component } from "react";

const API_ENDPOINT = "https://localhost";
const AUTH_CONTROLLER_PATH = "auth";
const LOGIN_ACTION_PATH = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH = "me";
const TEST_ADMIN_ACTION_PATH = "admin/test";

export class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const singInModel = {};
        singInModel.username = this.state.username;
        singInModel.password = this.state.password;
        const requestJsonData = JSON.stringify(singInModel);

        const loginRoute = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGIN_ACTION_PATH}`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: requestJsonData,
        })
            .then(response => response.json())
            .then(responseJson => {
                // if (responseJson.token) {
                //     this.setState({ token: responseJson.token, textareaContent: responseJson.token });
                // }
                // if (!responseJson.token) {
                //     this.setState({ textareaContent: "Invalid credentials." });
                // }
            })
            .catch(error => {
                console.log("error", error);
            })
    }

    handleClick = () => {
        const getMeRoute = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGGED_IN_USER_INFORMATION_ACTION_PATH}`;
        fetch(getMeRoute, {
            // headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.state.token}` },
        })
            .then(response => response.json())
            .then(response => {
                const responseJsonData = JSON.stringify(response);
                // this.setState({ textareaContent: responseJsonData });
            })
            .catch(error => {
                console.log("error", error);
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