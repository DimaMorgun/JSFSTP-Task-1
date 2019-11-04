import React, { Component } from "react";

import "../styles/Header.css";

export class Header extends Component {
    render(): any {
        return (
            <header>
                {/* <img className="logo-img" src="" alt="" /> */}<div className="logo-img" style={{ backgroundColor: 'red', width: '50px', height: '50px' }}></div>
                <div className="nav-links"></div>
                <div className="auth-links"></div>
            </header >
        );
    }
}

export default Header;