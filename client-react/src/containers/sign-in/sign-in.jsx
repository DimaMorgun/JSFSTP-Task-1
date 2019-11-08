import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signIn } from "../../actions/actionCreator";

import { Title } from "../../components/layout/Title";
import { SignInForm } from "../../components/auth/sign-in-form";
import { ResponseBox } from "../../components/common/response-box";

class SignIn extends Component {

    constructor(props, dispatch, a) {
        debugger;
        super(props);
    
        console.log(props.dispatch)
    }
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

    // signIn = ({ key }) => {
    //     const { taskText } = this.state;

    //     if (taskText.length > 3 && key === 'Enter') {
    //         const { addTast } = this.props;

    //         addTast((new Date()).getTime(), taskText, false);

    //         this.setState({
    //             taskText: '',
    //         })

    //     }

    // }
    componentDidMount(){
        this.props.init({ type: 'INCREMENT' })
    }

    render() {
        const { title, responseMessage } = this.state;
        const { username } = this.props;

        console.log("state", this.state);
        console.log("props", this.props);

        console.log("title", title);
        console.log("responseMessage", responseMessage);

        console.log("username", username);

        return (
            <div>
                <Title title={title} username={username} />
                <SignInForm onSignInSuccess={this.handleSignInSuccess} onGetUserInformation={this.handleGetUserInformation} />
                <ResponseBox responseMessage={responseMessage} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
      // dispatching plain actions
      init: () => dispatch(signIn()),
      decrement: () => dispatch({ type: 'DECREMENT' }),
      reset: () => dispatch({ type: 'RESET' })
    }
  }

//connect function takes 'MapStateToProps' function
export default connect(state => ({
    username: state.username,
    token: state.token,
}), mapDispatchToProps)(SignIn);