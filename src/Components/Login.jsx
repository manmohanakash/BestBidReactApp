import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import bid_block from "./images/bid_block.png";

import Footer from "./Shared/Footer";
import Loading from "./Shared/Loading";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      messageSet: false,
      message: "",
      redirect: false,
      isLoading: false
    };
  }

  render() {
    const myStyles = { minHeight: "90vh" };
    const message = this.state.message;

    if (this.state.redirect) return <Redirect to="/projects" />;
    else
      return (
        <div>
          <div className=" container " style={myStyles}>
            {this.state.isLoading && <Loading />}
            <div className="d-flex justify-content-center align-items-center container ">
              <form
                className="form-signin"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <img
                  className="rounded mx-auto d-block my-3"
                  width={250}
                  height={250}
                  src={bid_block}
                  alt=""
                />
                {this.state.messageSet && (
                  <div className="alert alert-danger text-center" role="alert">
                    {message}
                  </div>
                )}

                <label className="mt-3">Email</label>

                <input
                  onChange={this.changeUserName.bind(this)}
                  type="text"
                  value={this.state.userName}
                  className="form-control"
                  placeholder="Username"
                  required
                  autoFocus
                />

                <label className="mt-3">Password</label>

                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.changePassword.bind(this)}
                  className="form-control"
                  placeholder="Password"
                  required
                />

                <button
                  className="btn btn-lg btn-primary btn-block mt-3"
                  type="submit"
                >
                  Sign in
                </button>
                <div className="form-group mt-2 text-center">
                  <Link to="/register">Create New Account</Link>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      );
  }

  changeUserName(e) {
    this.setState({ userName: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      messageSet: false,
      isLoading: true
    });

    axios
      .post(
        "http://localhost:8080/login",
        {
          userName: this.state.userName,
          password: this.state.password
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.type === "fail") {
          this.setState({
            message: res.data.message,
            messageSet: true,
            isLoading: false
          });
        } else if (res.data.type === "success") {
          this.props.setLoggedIn();
          this.setState({
            message: res.data.message,
            messageSet: true,
            isLoading: false,
            redirect: true
          });
        }
      });
  }

  deleteBid = bidId => {
    console.log(bidId);
    this.setState({ projects: [], isLoading: true });
    let url = "http://localhost:8080/deleteMyBid/" + bidId;

    console.log(url);

    axios.delete(url, { withCredentials: true }).then(response => {
      console.log(response);
      this.setState({
        isLoading: false
      });
      alert(response.data.message);
    });
  };
}

export default Login;
