import React, { FunctionComponent, ReactElement } from "react";

import { connect } from 'react-redux';

import { AppState } from "../reducers";

const Independent: FunctionComponent<AppState> = (props): ReactElement => {
    const { username, userRole } = props.signIn.userInfo;

    let roleElement = <span>not logged in</span>;
    if (userRole && userRole.toLowerCase() === 'admin') {
        roleElement = <span style={{ backgroundColor: "red", color: "green" }}>{userRole}</span>;
    }
    if (userRole && userRole.toLowerCase() === 'client') {
        roleElement = <span style={{ backgroundColor: "green", color: "red" }}>{userRole}</span>;
    }

    return <h4>Hello dear {username ? username : "user"}. You'r {roleElement}.</h4>
}

const mapStateToProps = (state: AppState): AppState => {
    return state;
}

export default connect(mapStateToProps)(Independent);