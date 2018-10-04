import React, { Component } from "react";
import { styles } from "../styles/Footer.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  state = {};

  render() {
    return (
      <div className="footer-copyright text-center py-3 float-none">
        <a href="http://logicaltown.com" target="_blank">
          {""}
          Logicaltown­.com
        </a>
        {"  "}© 2018
        {"  "}
      </div>
    );
  }
}

export default Footer;
