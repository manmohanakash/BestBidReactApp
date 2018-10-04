import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/Projects.css";

import Loading from "../Shared/Loading";
import MyProjectItem from "./MyProjectItem";
import Toolbar from "../Shared/Toolbar";
import Footer from "../Shared/Footer";

class MyProjects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      table: "",
      page: 1,
      totalPages: 1,
      size: 10,
      sort: "createdAt",
      order: "",
      isLoading: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    let projects = this.state.projects;
    {
      return (
        <div>
          <Toolbar
            isLogged={this.props.isLogged}
            setLoggedOut={this.props.setLoggedOut.bind(this)}
          />
          <div className="container">
            <h1>MY PROJECTS</h1>
            {this.state.isLoading && <Loading />}
            <div className="projectList">
              <div className="selection" align="center">
                &nbsp;&nbsp;&nbsp;SORT BY&nbsp;
                <select
                  value={this.state.sort}
                  onChange={this.changeSortBy.bind(this)}
                >
                  <option value="createdAt" default>
                    CREATED AT
                  </option>
                  <option value="projectId">PROJECT ID</option>
                  <option value="projectName">NAME</option>
                  <option value="description">DESCRIPTION</option>
                  <option value="maximumBudget">MAXIMUM BUDGET</option>
                  <option value="createdAt">CREATED TIME</option>
                  <option value="deadline">DEADLINE</option>
                  <option value="totalBids">TOTAL BIDS</option>
                </select>
                &nbsp;&nbsp;&nbsp;ORDER&nbsp;
                <select
                  value={this.state.order}
                  onChange={this.changeOrder.bind(this)}
                >
                  <option value="asc">ASCENDING</option>
                  <option value="desc">DESCENDING</option>
                </select>
                &nbsp;&nbsp;&nbsp; SIZE&nbsp;
                <select
                  value={this.state.size}
                  onChange={this.changePageSize.bind(this)}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;&nbsp;&nbsp;PAGE:&nbsp;
                {this.state.page}
                &nbsp;of&nbsp;
                {this.state.totalPages}
              </div>
              <table align="center" className="mt-3">
                <th>Project ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>MAXIMUM BUDGET</th>
                <th>CURRENT MIN BID</th>
                <th>CREATED AT</th>
                <th>DEADLINE</th>
                <th>TOTAL BIDS</th>
                <th>VIEW</th>
                {projects.map(project => (
                  <MyProjectItem
                    key={project.projectsId}
                    project={project}
                    deleteProject={this.deleteProject.bind(this)}
                  />
                ))}
              </table>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }

  fetchData() {
    this.setState({ projects: [], isLoading: true });

    let page = this.state.page - 1;

    let url =
      "http://localhost:8080/getMyProjects?page=" +
      page +
      "&size=" +
      this.state.size +
      "&sort=" +
      this.state.sort +
      "," +
      this.state.order;

    console.log(url);
    axios.get(url, { withCredentials: true }).then(response => {
      console.log(response);
      this.setState({
        projects: response.data.content,
        totalPages: response.data.totalPages,
        isLoading: false
      });
    });
  }

  deleteProject = projectId => {
    this.setState({ projects: [], isLoading: true });
    let url = "http://localhost:8080/deleteMyProject/" + projectId;

    console.log(url);

    axios.delete(url, { withCredentials: true }).then(response => {
      console.log(response);
      this.setState(
        {
          isLoading: false
        },
        () => this.fetchData()
      );
      alert(response.data.message);
    });
  };

  changeSortBy = e => {
    this.setState({ sort: e.target.value }, () => this.fetchData());
  };
  changeOrder = e => {
    this.setState({ order: e.target.value }, () => this.fetchData());
  };
  changePageSize = e => {
    this.setState({ size: e.target.value }, () => this.fetchData());
  };
}

export default MyProjects;
