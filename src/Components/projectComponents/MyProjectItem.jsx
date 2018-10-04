import React, { Component } from "react";

import { Link } from "react-router-dom";

class MyProjectItem extends Component {
  state = {};
  render() {
    let project = this.props.project;
    return (
      <tr>
        <td>{project.projectId}</td>
        <td>{project.projectName.toUpperCase()}</td>
        <td>{project.description}</td>
        <td>{project.maximumBudget}</td>
        <td>{project.lowestBid || "-"}</td>
        <td>{project.createdAt}</td>
        <td>{project.deadline}</td>
        <td>{project.totalBids}</td>
        <td>
          <div className="btn-group btn-group-sm">
            <Link className="btn btn-info" to={"/project/" + project.projectId}>
              SEE MORE
            </Link>{" "}
            <button
              className="btn btn-danger"
              onClick={() => this.props.deleteProject(project.projectId)}
            >
              DELETE
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default MyProjectItem;
