import React, { Component } from "react";
import { styles } from "./styles/About.css";

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
            The source code can be found on{" "}
            <a href="https://github.com/manmohanakash" target="_blank">
              github
            </a>
            .
          </h4>
          <br />
          <br />
          <div className="technology">
            <h2>TECHNOLOGY STACK:</h2>
            <h4>
              SERVER : SPRINGBOOT
              <img
                src={springboot}
                alt={"SpringBoot Icon"}
                height="30px"
                width="90px"
              />{" "}
            </h4>
            <h4>
              FRONTEND : ANGULAR
              <img
                src={angular}
                alt={"ANGULAR Icon"}
                height="30px"
                width="90px"
              />
            </h4>
            <h4>
              DATABASE : MySQL
              <img src={mysql} alt={"MySQL Icon"} height="30px" width="90px" />
            </h4>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default About;
