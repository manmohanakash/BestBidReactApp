import React, { Component } from "react";
import axios from "axios";
import styles from "./styles/AddProject.css";

import Footer from "./Shared/Footer";
import Toolbar from "./Shared/Toolbar";
import Loading from "./Shared/Loading";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      description: "",
      workType: "",
      maximumBudget: "",
      deadlineDate: "",
      deadlineTime: "",
      message: "",
      errorMessageSet: false,
      successMessageSet: false,
      isLoading: false
    };
  }
  render() {
    if (this.state.isLoading) return <Loading />;
    else
      return (
        <div>
          <Toolbar
            isLogged={this.props.isLogged}
            setLoggedOut={this.props.setLoggedOut.bind(this)}
          />
          <div className=" container ">
            <h1>ADD PROJECT</h1>
            <form
              className="form-signin "
              onSubmit={this.handleSubmit.bind(this)}
            >
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

              <div className="addProject">
                <table>
                  <tr>
                    <td>
                      <label className="mt-3">Project Name</label>
                    </td>
                    <td>
                      <input
                        onChange={this.changeProjectName.bind(this)}
                        type="text"
                        value={this.state.projectName}
                        className="form-control"
                        placeholder="Project Name"
                        required
                        autoFocus
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="mt-3">Description</label>
                    </td>
                    <td>
                      <textarea
                        onChange={this.changeDescription.bind(this)}
                        type="text"
                        value={this.state.description}
                        className="form-control"
                        placeholder="description"
                        rows={3}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="mt-3">Work Type</label>
                    </td>
                    <td>
                      <input
                        onChange={this.changeWorkType.bind(this)}
                        type="text"
                        value={this.state.workType}
                        className="form-control"
                        placeholder="Work Type"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="mt-3">Maximum Budget</label>
                    </td>
                    <td>
                      <input
                        onChange={this.changeMaximumBudget.bind(this)}
                        type="text"
                        value={this.state.maximumBudget}
                        className="form-control"
                        placeholder="Budget"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="mt-3">Deadline</label>
                    </td>
                    <td>
                      <input
                        onChange={this.changeDeadlineDate.bind(this)}
                        type="date"
                        value={this.state.deadlineDate}
                        className="form-control"
                        required
                      />
                      <input
                        onChange={this.changeDeadlineTime.bind(this)}
                        type="time"
                        value={this.state.deadlineTime}
                        className="form-control"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <button
                        className="btn btn-lg btn-primary btn-block mt-2 mb-2"
                        type="submit"
                      >
                        Add Project
                      </button>
                    </td>
                  </tr>
                </table>
              </div>
            </form>
          </div>
          <Footer />
        </div>
      );
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      errorMessageSet: false,
      successMessageSet: false,
      isLoading: true
    });

    axios
      .post(
        "http://localhost:8080/addProject",
        {
          projectName: this.state.projectName,
          description: this.state.description,
          workType: this.state.workType,
          maximumBudget: this.state.maximumBudget,
          deadline:
            this.state.deadlineDate + " " + this.state.deadlineTime + ":00"
        },
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          message: res.data.message,
          isLoading: false
        });

        if (res.data.type === "fail")
          this.setState({
            errorMessageSet: true
          });
        else if (res.data.type === "success")
          this.setState({
            successMessageSet: true,
            projectName: "",
            description: "",
            maximumBudget: "",
            workType: "",
            deadlineDate: "",
            deadlineTime: ""
          });
      });
  }

  changeProjectName(e) {
    this.setState({ projectName: e.target.value });
  }

  changeDescription(e) {
    this.setState({ description: e.target.value });
  }

  changeWorkType(e) {
    this.setState({ workType: e.target.value });
  }

  changeMaximumBudget(e) {
    this.setState({ maximumBudget: e.target.value });
  }

  changeDeadlineDate(e) {
    this.setState({ deadlineDate: e.target.value });
  }
  changeDeadlineTime(e) {
    this.setState({ deadlineTime: e.target.value });
  }
}

export default AddProject;
