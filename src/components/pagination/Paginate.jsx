import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Paginate.css";

export function paginate(tasksToDisplay, setCurrentPage, currentPage) {
  const tasksPerPage = 5;

  const pageCount = Math.ceil(tasksToDisplay.length / tasksPerPage);
  const offset = currentPage * tasksPerPage;

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const currentPageData = tasksToDisplay?.slice(offset, offset + tasksPerPage);

  return { currentPageData, pageCount, handlePageClick };
}

export default function PaginateComponent({ handlePageClick, pageCount }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      pageCount={pageCount}
      previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
      renderOnZeroPageCount={null}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination-link"}
      nextLinkClassName={"pagination-link"}
      disabledClassName={"pagination-disabled-link"}
      activeClassName={"pagination-active-link"}
    />
  );
}
