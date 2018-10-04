import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import registerImage from "./images/register_now.jpg";

import Footer from "./Shared/Footer";
import Loading from "./Shared/Loading";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      messageSet: false,
      message: "",
      isLoading: false,
      isCreated: false
    };
  }

  render() {
    const styles = {
      minHeight: "82.5vh"
    };

    if (this.state.isCreated) return <Redirect to="/login" />;
    else
      return (
        <div>
          <div class="container">
            {this.state.isLoading && <Loading />}
            <div className="d-flex justify-content-center align-items-center">
              <form
                className="form-signin mt-5"
                style={styles}
                onSubmit={this.handleSubmit.bind(this)}
              >
                <img
                  className="rounded mx-auto d-block mb-2"
                  width={300}
                  height={50}
                  src={registerImage}
                  alt=""
                />
                {this.state.messageSet && (
                  <div
                    className="alert alert-danger text-center mt-3 mb-2"
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                )}

                <label className="mt-2">Username</label>

                <input
                  onChange={this.changeUserName.bind(this)}
                  type="text"
                  value={this.state.userName}
                  className="form-control"
                  placeholder="Username"
                  required
                  autoFocus
                />

                <label className="mt-3">Email</label>

                <input
                  onChange={this.changeEmail.bind(this)}
                  type="text"
                  value={this.state.email}
                  className="form-control"
                  placeholder="Email"
                  required
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

                <label className="mt-3">Confirm Password</label>

                <input
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.changeConfirmPassword.bind(this)}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
                <button
                  className="btn btn-lg btn-primary btn-block mt-3"
                  type="submit"
                >
                  Register
                </button>

                <div className="form-group mt-2 text-center">
                  <Link to="/login">Already have an Account</Link>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      messageSet: false,
      isLoading: true
    });

    if (this.state.confirmPassword === this.state.password) {
      axios
        .post("http://localhost:8080/register", {
          userName: this.state.userName,
          password: this.state.password,
          email: this.state.email
        })
        .then(res => {
          this.setState({
            message: res.data.message,
            messageSet: true,
            isLoading: false
          });

          if (res.data.type === "success") {
            this.setState({
              message: this.state.message + ". Redirect to login..."
            });
            alert("Account created. You will be redirected to login.");
            this.redirectToLogin();
          }
        });
    } else {
      this.setState({
        message: "Passwords do not match!",
        messageSet: true,
        password: "",
        confirmPassword: "",
        isLoading: false
      });
    }
  }

  redirectToLogin = () => {
    setTimeout(() => {
      this.setState({ isCreated: true });
    }, 2000);
  };

  changeUserName(e) {
    this.setState({ userName: e.target.value });
  }

  changeEmail(e) {
    this.setState({ email: e.target.value });
  }

  changePassword(e) {
    this.setState({ password: e.target.value });
  }

  changeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
}

export default Register;
