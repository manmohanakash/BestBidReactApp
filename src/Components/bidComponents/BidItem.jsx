import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import DeleteBidDialog from "./DeleteBidDialog";

class BidItem extends Component {
  state = {};
  render() {
    let bid = this.props.bid;
    return (
      <tr>
        <td>{bid.bidId}</td>
        <td>{bid.projectId}</td>
        <td>{bid.bidAmount}</td>
        <td>{bid.bidAt}</td>
        <td>
          <Link className="btn btn-info" to={"/project/" + bid.projectId}>
            SEE PROJECT
          </Link>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.deleteBid(bid.bidId);
            }}
          >
            DELETE BID
          </button>
        </td>
      </tr>
    );
  }

  deleteBid = bidId => {
    console.log(bidId);
    this.setState({ projects: [], isLoading: true });
    let url = "http://localhost:8080/deleteMyBid/" + bidId;

    console.log(url);

    axios.delete(url, { withCredentials: true }).then(response => {
      console.log(response);
      this.setState(
        {
          isLoading: false
        },
        () => this.props.fetchData()
      );
      alert(response.data.message);
    });
  };
}

export default BidItem;
