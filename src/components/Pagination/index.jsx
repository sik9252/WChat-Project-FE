import React from 'react';

/** styles */
import { PaginationContainer } from './style';

/** components */
import { Button } from '../Button';

function Pagination({ totalPageCount, currentPage, setCurrentPage }) {
  const onClickPrevBtn = () => {
    if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNextBtn = () => {
    if (currentPage !== totalPageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      {totalPageCount === 0 ? (
        <>
          <Button></Button>
          <div>{currentPage}</div>
          <Button></Button>
        </>
      ) : (
        <>
          {currentPage === 1 ? (
            <Button></Button>
          ) : (
            <Button width={60} height={40} onClick={() => onClickPrevBtn()}>
              이전
            </Button>
          )}
          <div>{currentPage}</div>
          {totalPageCount === currentPage ? (
            <Button></Button>
          ) : (
            <Button width={60} height={40} onClick={() => onClickNextBtn()}>
              다음
            </Button>
          )}
        </>
      )}
    </PaginationContainer>
  );
}

export default Pagination;
