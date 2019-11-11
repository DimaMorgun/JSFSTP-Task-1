import React, { Component, Fragment } from "react";

import SignIn from "./containers/sign-in/sign-in"

class App extends Component {
  render() {
    return (
      <Fragment>
        <SignIn />
      </Fragment>
    );
  }
}

export default App;
