import React, { Component } from "react";

class Pagination extends Component {
  state = {
    currentPage: this.props.currentPage,
    totalPages: this.props.totalPages
  };

  render() {
    let pageArray = [];
    let currentPage = this.state.currentPage;
    let totalPages = this.state.totalPages;

    let start = 0;
    let end = totalPages;

    if (currentPage > 5) {
      start = currentPage - 5;
    }
    if (totalPages > start + 10) {
      totalPages = start + 10;
    }

    for (let i = start; i < end; i++) {
      pageArray.push(i);
    }

    return (
      <div className="center">
        <nav aria-label="Page navigation example ">
          <ul className="pagination justify-content-center">
            <li
              className={currentPage === 0 ? "page-item disabled" : "page-item"}
            >
              <a
                className="page-link"
                onClick={() => this.props.changeToPreviousPage()}
              >
                Previous
              </a>
            </li>
            {pageArray.map(pageItem => (
              <li
                className={
                  this.state.currentPage === pageItem
                    ? "page-item active"
                    : "page-item"
                }
                key={pageItem}
              >
                <a
                  className="page-link"
                  onClick={() => {
                    console.log(pageItem);
                    this.props.changePage(pageItem);
                  }}
                >
                  {pageItem + 1}
                </a>
              </li>
            ))}

            <li
              className={
                currentPage === totalPages - 1
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                class="page-link"
                onClick={() => this.props.changeToNextPage()}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
