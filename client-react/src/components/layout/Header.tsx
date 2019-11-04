import React from "react";

import Button from '@material-ui/core/Button';

export const Header = () => {
    return (
        <header>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
            <div className="logo-img" style={{ backgroundColor: 'red', width: '50px', height: '50px' }}></div>
            <div className="nav-links">
                <a href="">link 1</a>
                <a href="">link 2</a>
                <a href="">link 3</a>
                <a href="">link 4</a>
                <a href="">link 5</a>
            </div>
            <div className="auth-links">
                <div className="logo-img" style={{ backgroundColor: 'red', width: '50px', height: '50px' }}></div>
                <a href="">Sign In</a>
            </div>
        </header >
    );
}

export default Header;
