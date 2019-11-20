import React, { FunctionComponent } from "react";

import { connect } from 'react-redux';

import { AppState } from "../reducers";

import { IndependentProps } from "../types/independent.types";

const Independent: FunctionComponent<IndependentProps> = (props) => {
    const { userInfo } = props.signIn;

    let roleElement = <span>not logged in</span>;
    if (userInfo.userRole && userInfo.userRole.toLowerCase() === 'admin') {
        roleElement = <span style={{ backgroundColor: "red", color: "green" }}>{userInfo.userRole}</span>;
    }
    if (userInfo.userRole && userInfo.userRole.toLowerCase() === 'client') {
        roleElement = <span style={{ backgroundColor: "green", color: "red" }}>{userInfo.userRole}</span>;
    }

    return <h4>Hello dear {userInfo.username ? userInfo.username : "user"}. You'r {roleElement}.</h4>
}

const mapStateToProps = (state: AppState) => {
    console.log('mapStateToProps Independent', state.signIn);
    const { signIn } = state;

    return {
        signIn,
    }
}

export default connect(mapStateToProps, {})(Independent);