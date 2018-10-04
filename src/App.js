import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.css";

import About from "./Components/About";
import AddProject from "./Components/AddProject";
import MyBids from "./Components/bidComponents/MyBids";
import Login from "./Components/Login";
import Page404 from "./Components/Page404";
import Project from "./Components/projectComponents/Project";
import Projects from "./Components/projectComponents/Projects";
import MyProjects from "./Components/projectComponents/MyProjects";
import Register from "./Components/Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Login {...props} setLoggedIn={this.setLoggedIn.bind(this)} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} setLoggedIn={this.setLoggedIn.bind(this)} />
              )}
            />
            <Route
              exact
              path="/projects"
              render={props => (
                <Projects
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/myProjects"
              render={props => (
                <MyProjects
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />{" "}
            <Route
              exact
              path="/myBids"
              render={props => (
                <MyBids
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/project/:projectId"
              render={props => (
                <Project
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/addProject"
              render={props => (
                <AddProject
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
            <Route
              exact
              path="/about"
              render={props => (
                <About
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
            <Route exact path="*" render={props => <Register />} />
            <Route
              exact
              path="/about"
              render={props => (
                <Page404
                  {...props}
                  isLogged={this.state.isLogged}
                  setLoggedOut={this.setLoggedOut.bind(this)}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }

  setLoggedIn() {
    this.setState({ isLogged: true });
  }

  setLoggedOut() {
    this.setState({ isLogged: false });
  }
}

export default App;
