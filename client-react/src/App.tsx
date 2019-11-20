import React, { Component, Fragment } from "react";

import Independent from "./redux/containers/independent.container";
import SignIn from "./redux/containers/sign-in.container";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Independent />
        <hr />
        <SignIn />
      </Fragment>
    );
  }
}

export default App;
