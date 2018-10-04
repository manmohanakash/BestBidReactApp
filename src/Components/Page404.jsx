import React, { Component } from "react";

import Footer from "./Shared/Footer";
import Toolbar from "./Shared/Toolbar";

class Page404 extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Toolbar
          isLogged={this.props.isLogged}
          setLoggedOut={this.props.setLoggedOut.bind(this)}
        />
        <div className="container">
          <h1>Page Not Found</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Page404;
