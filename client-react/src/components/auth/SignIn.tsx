import React, { Component, FormEvent } from "react";

export class SignIn extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('SignIn Request.', this.state);

        fetch("https://localhost/user/5dc05905a712681a084c2d85")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <div className="signin-wrapper">
                <p>SignIn - Form</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="username" id="username" onChange={this.handleChange} />
                    <input type="password" id="password" onChange={this.handleChange} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}