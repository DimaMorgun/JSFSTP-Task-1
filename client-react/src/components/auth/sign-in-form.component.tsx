import React, { Component, ReactElement } from "react";

import { SignInFormProps, SignInFormState, SignInModel } from "../../types/index"

export class SignInForm extends Component<SignInFormProps, SignInFormState> {
    state: SignInFormState = {
        username: "",
        password: "",
        isPasswordHidden: true,
    };

    test: boolean = true;

    handleUsernameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const username: string = event.currentTarget.value;

        this.setState({ username });
    }

    handlePasswordChange = (event: React.FormEvent<HTMLInputElement>): void => {
        const password: string = event.currentTarget.value;

        this.setState({ password });
    }

    handleChangePasswordView = (): void => {
        const { isPasswordHidden }: SignInFormState = this.state;

        this.setState({ isPasswordHidden: !isPasswordHidden });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        const { username, password } = this.state;

        const isCompleted: boolean = this.props.onSignIn(username, password);

        if (isCompleted) {
            this.setState({ password: "" });
        }
    }

    handleClick = (): void => {
        this.props.onGetUserInformation();
    }

    render(): ReactElement {
        return (
            <div>
                <p>SignIn - Form</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} />
                    <br />
                    <input type={this.state.isPasswordHidden ? "password" : "text"} id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <button type="button" onClick={this.handleChangePasswordView}>
                        {this.state.isPasswordHidden ? "\u229A" : "\u2297"}
                    </button>
                    <br />
                    <input type="submit" value="Submit" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="button" value="My Info" onClick={this.handleClick} />
                </form>
            </div>
        );
    }
}
