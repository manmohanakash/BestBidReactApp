import React, { Component } from "react";
import { styles } from "./styles/About.css";
import { Link } from "react-router-dom";

import angular from "./images/angular.png";
import springboot from "./images/spring-boot.png";
import mysql from "./images/mysql.png";

import Toolbar from "./Shared/Toolbar";
import Footer from "./Shared/Footer";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="about">
        <Toolbar
          isLogged={this.props.isLogged}
          setLoggedOut={this.props.setLoggedOut.bind(this)}
        />
        <div className="container content">
          <h1>Best Bid</h1>
          <br />
          <h2>ABOUT:</h2>
          <h4>
            The website is a part of a personal project. The source code for the
            website can be found on{" "}
            <Link to="https://github.com/manmohanakash" target="_blank">
              github
            </Link>
            .
          </h4>
          <br />
          <br />
          <div className="technology">
            <h2>TECHNOLOGY STACK:</h2>
            <h4>
              SERVER : SPRINGBOOT
              <img src={springboot} height="30px" width="90px" />{" "}
            </h4>
            <h4>
              FRONTEND : ANGULAR
              <img src={angular} height="30px" width="90px" />
            </h4>
            <h4>
              DATABASE : MySQL
              <img src={mysql} height="30px" width="90px" />
            </h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
