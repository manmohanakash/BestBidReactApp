import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { styles } from "../styles/Toolbar.css";

import bid_logo from "../images/bid_logo.png";

class Toolbar extends Component {
  state = {};

  render() {
    if (!this.props.isLogged) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="navbar-brand" href="#">
            <img
              src={bid_logo}
              height="50px"
              width="50px"
              className="ml-2 mr-2"
            />
            BEST BID
          </div>
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/projects">
                  Projects
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/myProjects" Disabled>
                  My Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addProject">
                  Add Project
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/myBids">
                  My Bids
                </Link>
              </li>
              <li className="nav-item" />
            </ul>
          </div>
          <Link className="nav-link" to="/about">
            About
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => this.props.setLoggedOut()}
          >
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

export default Toolbar;
