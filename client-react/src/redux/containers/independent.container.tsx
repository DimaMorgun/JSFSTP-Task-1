import React, { FunctionComponent } from "react";

import { connect } from 'react-redux';

import { AppState } from "../reducers";

const Independent: FunctionComponent<AppState> = (props) => {
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
    return state;
}

export default connect(mapStateToProps, {})(Independent);