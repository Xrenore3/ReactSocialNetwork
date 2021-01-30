import React, { useState } from "react";
import classes from "./Paginator.module.css";

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (page:number, portionNumber:number)=>void,
    portionSize:number,
    statePortionNumber: number,
  }


const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 5,
  statePortionNumber,
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
      {portionNumber > 1 && (
        <button
          className={classes.btnPrevNext}
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          {"<"}
        </button>
      )}
      {pages
        .filter(
          (page) =>
            page >= leftPortionPageNumber && page <= rightPortionPageNumber
        )
        .map((page) => {
          return (
            <span
              key={page}
              className={
                currentPage === page ? classes.selectedPage : undefined
              }
              onClick={() => onPageChanged(page, portionNumber)}
            >
              {page}
            </span>
          );
        })}
      {protionCount > portionNumber && (
        <button
          className={classes.btnPrevNext}
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
};
export default Paginator;
