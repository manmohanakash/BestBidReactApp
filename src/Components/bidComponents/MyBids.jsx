import React, { Component } from "react";
import axios from "axios";
import styles from "../styles/Projects.css";

import Loading from "../Shared/Loading";
import BidItem from "../bidComponents/BidItem";
import Toolbar from "../Shared/Toolbar";
import Footer from "../Shared/Footer";

class MyBids extends Component {
  constructor() {
    super();
    this.state = {
      bids: [],
      table: "",
      page: 1,
      totalPages: 1,
      size: 10,
      sort: "bidAt",
      order: "",
      isLoading: false
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    {
      if (this.state.isLoading) return <Loading />;
      else {
        let bids = this.state.bids;
        return (
          <div>
            <Toolbar
              isLogged={this.props.isLogged}
              setLoggedOut={this.props.setLoggedOut.bind(this)}
            />
            <div className="container">
              <h1>MY BIDS</h1>
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
                    <option value="bidId">BID ID</option>
                    <option value="projectId">PROJECT ID</option>
                    <option value="bidAmount">AMOUNT</option>
                    <option value="bidAt">BID TIME</option>
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
                <table align="center">
                  <th>BID ID</th>
                  <th>BID PROJECT ID</th>
                  <th>BID AMOUNT</th>
                  <th>BID TIME</th>
                  <th>VIEW PROJECT</th>
                  <th>DELETE BID</th>
                  {bids.map(bid => (
                    <BidItem
                      key={bid.bidId}
                      bid={bid}
                      fetchData={this.fetchData.bind(this)}
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
  }

  fetchData() {
    this.setState({ projects: [], isLoading: true });
    let page = this.state.page - 1;
    let url =
      "http://localhost:8080/getMyBids?page=" +
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
        bids: response.data.content,
        totalPages: response.data.totalPages,
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
  changePage = e => {
    this.setState({ page: e.target.value });
  };
}

export default MyBids;
