import React, { useState } from "react";
import classes from "./Paginator.module.css";

let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 5,
  statePortionNumber
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  let protionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(statePortionNumber);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  

  return (
    <div className={classes.allPages}>
      {portionNumber > 1 && <button>PREV</button>}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              className={currentPage === page && classes.selectedPage}
              onClick={() => onPageChanged(page,portionNumber)}
            >
              {page}
            </span>
          );
        })}
      {protionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};
export default Paginator;
