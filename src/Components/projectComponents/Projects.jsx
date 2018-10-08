import React, { Component } from "react";
import axios from "axios";

import styles from "../styles/Projects.css";

import Footer from "../Shared/Footer";
import Loading from "../Shared/Loading";
import ProjectItem from "./ProjectItem";
import Pagination from "../Shared/Pagination";
import Toolbar from "../Shared/Toolbar";

class Projects extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      table: "",
      currentPage: 0,
      totalPages: 0,
      totalItems: 0,
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

    return (
      <div className="myProjects ">
        <Toolbar
          isLogged={this.props.isLogged}
          setLoggedOut={this.props.setLoggedOut.bind(this)}
        />
        <div className="container ">
          <h1>ALL PROJECTS</h1>
          <div className="projectList">
            <div className="selection mb-2 " align="center">
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
              </select>{" "}
              &nbsp;&nbsp;&nbsp;PAGE:&nbsp;
              {this.state.currentPage + 1}
              &nbsp;of&nbsp;
              {this.state.totalPages}
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;TOTAL PROJECTS:&nbsp;
              {this.state.totalItems}
            </div>
            <Pagination
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              changePage={this.changePage.bind(this)}
              changeToPreviousPage={this.changeToPreviousPage.bind(this)}
              changeToNextPage={this.changeToNextPage.bind(this)}
            />
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
                <ProjectItem key={project.projectsId} project={project} />
              ))}
            </table>
            {this.state.isLoading && <Loading />}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  fetchData() {
    this.setState({ projects: [], isLoading: true });

    console.log(this.state);

    let url =
      "http://localhost:8080/getProjects?page=" +
      this.state.currentPage +
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
        page: response.data.pageable.page,
        totalItems: response.data.total,
        isLoading: false
      });
    });
  }

  changeSortBy = e => {
    this.setState({ sort: e.target.value }, () => this.fetchData());
  };
  changeOrder = e => {
    this.setState({ order: e.target.value }, () => this.fetchData());
  };
  changePageSize = e => {
    this.setState({ size: e.target.value }, () => this.fetchData());
  };

  changePage = number => {
    console.log("in projects " + number);
    this.setState({ currentPage: number }, () => this.fetchData());
  };

  changeToPreviousPage = () => {
    this.setState({ currentPage: this.state.currentPage - 1 }, () =>
      this.fetchData()
    );
  };

  changeToNextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 }, () =>
      this.fetchData()
    );
  };
}

export default Projects;
