import React, { Component, Fragment } from "react";

import SignIn from "./redux/containers/sign-in/sign-in.container";

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
