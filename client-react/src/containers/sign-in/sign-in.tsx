import React, { Component, ReactElement } from "react";

import { Title } from "../../components/layout/Title";
import { SignInForm } from "../../components/auth/sign-in-form";
import { ResponseBox } from "../../components/common/response-box";

export class SignIn extends Component {
    state = {
        title: "Sign In Page",
        username: "",
        token: "",
        responseMessage: "",

    }

    render(): ReactElement {
        const { title, username, responseMessage } = this.state;

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm />
                <ResponseBox responseMessage={responseMessage} />
            </div>
        );
    }
}