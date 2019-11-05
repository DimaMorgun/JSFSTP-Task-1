import React, { Component, FormEvent, ReactElement } from "react";

const API_ENDPOINT: string = "https://localhost";
const AUTH_CONTROLLER_PATH: string = "auth";
const LOGIN_ACTION_PATH: string = "login";
const LOGGED_IN_USER_INFORMATION_ACTION_PATH: string = "me";
const TEST_ADMIN_ACTION_PATH: string = "admin/test";

interface ISignInModel {
    username?: string;
    password?: string;
}

export class SignIn extends Component {
    state = {
        username: "",
        password: "",
        token: "",
        textareaContent: "",
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log("SignIn Request.", this.state);

        const singInModel: ISignInModel = {};
        singInModel.username = this.state.username;
        singInModel.password = this.state.password;

        const loginRoute: string = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGIN_ACTION_PATH}`;
        fetch(loginRoute, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(singInModel),
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log("responseJson", responseJson);

                if (responseJson.token) {
                    this.setState({ token: responseJson.token });
                }
            })
            .catch(error => {
                console.log("error", error);
            })
            .finally(() => {
                alert("'signIn' Request completed.");
            });
    }

    handleClick = () => {
        const getMeRoute: string = `${API_ENDPOINT}/${AUTH_CONTROLLER_PATH}/${LOGGED_IN_USER_INFORMATION_ACTION_PATH}`;
        fetch(getMeRoute, {
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${this.state.token}` },
        })
            .then(response => response.json())
            .then(response => {
                this.setState({ textareaContent: JSON.stringify(response) });
            })
            .catch(error => {
                console.log("error", error);
            })
            .finally(() => {
                alert("'getMe' Request completed.");
            });
    }

    render(): ReactElement {
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
                <textarea cols={50} rows={20} readOnly value={this.state.textareaContent} />
            </div>
        );
    }
}