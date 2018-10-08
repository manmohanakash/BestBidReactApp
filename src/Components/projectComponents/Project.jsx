import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/Project.css";

import Toolbar from "../Shared/Toolbar";
import Footer from "../Shared/Footer";

class Project extends Component {
  state = {
    projectId: this.props.match.params.projectId,
    project: {},
    newBid: "",
    message: "",
    errorMessageSet: false,
    successMessageSet: false,
    isLoading: true
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let project = this.state.project;
    return (
      <div>
        <Toolbar
          isLogged={this.props.isLogged}
          setLoggedOut={this.props.setLoggedOut.bind(this)}
        />
        <div className="container">
          <h1>PROJECT DETAILS</h1>
          {this.state.errorMessageSet && (
            <div className="alert alert-danger text-center" role="alert">
              {this.state.message}
            </div>
          )}

          {this.state.successMessageSet && (
            <div className="alert alert-success text-center" role="alert">
              {this.state.message}
            </div>
          )}

          <div className="projectCard">
            <table>
              <tr>
                <td>PROJECT ID</td>
                <td>{project.projectId}</td>
              </tr>
              <tr>
                <td>PROJECT NAME</td>
                <td>{project.projectName}</td>
              </tr>

              <tr>
                <td>DEADLINE</td>
                <td>{project.deadline}</td>
              </tr>
              <tr>
                <td>PROJECT DESCRIPTION</td>
                <td>{project.description}</td>
              </tr>
              <tr>
                <td>BUDGET</td>
                <td>{project.maximumBudget}</td>
              </tr>
              <tr>
                <td>CREATED TIME</td>
                <td>{project.createdAt}</td>
              </tr>
              <tr>
                <td>CURRENT TOTAL BIDS</td>
                <td>{project.totalBids}</td>
              </tr>
              <tr>
                <td>TYPE OF WORK</td>
                <td>{project.workType}</td>
              </tr>
              <tr>
                <td>CURRENT LOWEST BID</td>
                <td>{project.lowestBid || "-"}</td>
              </tr>
              <tr>
                <td>ENTER BID AMOUNT</td>
                <td>
                  <form
                    className="inline"
                    onSubmit={this.submitNewBid.bind(this)}
                  >
                    <input
                      type="number"
                      onChange={this.changeNewBid.bind(this)}
                      required
                      min={0}
                      max={project.maximumBudget}
                    />
                    &nbsp;
                    <button className="btn btn-primary"> PLACE BID </button>
                  </form>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  fetchData() {
    this.setState({ isLoading: true });

    let url = "http://localhost:8080/getProject/" + this.state.projectId;

    axios.get(url).then(response => {
      this.setState({ project: response.data.value, isLoading: false });
    });
  }

  submitNewBid(e) {
    e.preventDefault();

    this.setState({
      message: "",
      errorMessageSet: false,
      successMessageSet: false,
      isLoading: true
    });

    axios
      .post(
        "http://localhost:8080/placeMyBid",
        {
          projectId: this.state.projectId,
          bidAmount: this.state.newBid
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.type === "fail") {
          this.setState({
            message: res.data.message,
            errorMessageSet: true,
            isLoading: false
          });
        } else if (res.data.type === "success") {
          this.setState(
            {
              message: res.data.message,
              successMessageSet: true,
              isLoading: false
            },
            () => this.fetchData()
          );
        }
        alert(res.data.message);
      });
  }

  changeNewBid(e) {
    this.setState({ newBid: e.target.value });
  }
}

export default Project;
