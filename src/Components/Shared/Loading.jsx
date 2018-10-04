import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import styles from "../styles/Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="sweet-loading loadingSpinner">
        <ClipLoader sizeUnit={"px"} size={150} color={"#00FFFF"} />{" "}
      </div>
    );
  }
}

export default Loading;
