import React, { Component } from "react";
import styles from "./styles/Home.css";

import Footer from "./Shared/Footer";
import Projects from "./projectComponents/Projects";
import Toolbar from "./Shared/Toolbar";

class Home extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <div className="container content">
          <Projects />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
