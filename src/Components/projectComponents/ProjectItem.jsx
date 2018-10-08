import React, { Component } from "react";

import { Link } from "react-router-dom";

class ProjectItem extends Component {
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
          <Link className="btn btn-info" to={"/project/" + project.projectId}>
            SEE MORE
          </Link>{" "}
        </td>
      </tr>
    );
  }
}

export default ProjectItem;
