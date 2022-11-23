import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  limit: number; pageCount: number; currentPage: number; onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ limit, pageCount, currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={limit}
      pageCount={pageCount}
      forcePage={currentPage - 1}

    // renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
