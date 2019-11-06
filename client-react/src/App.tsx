import React, { Component, Fragment } from "react";

import { SignIn } from "./components/auth/SignIn";
import { Title } from "./components/layout/Title";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Title title="Simple SignIn App" />
        <SignIn />
      </Fragment>
    );
  }
}

export default App;
