import React from "react";

interface PaginatorProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Paginator = ({
  page: currentPage,
  totalPages,
  setPage
}: PaginatorProps) => (
  <div>
    {Array(totalPages)
      .fill(0)
      .map((_, i) => {
        const page = i + 1;
        return currentPage !== page ? (
          <button onClick={() => setPage(page)}>{page}</button>
        ) : (
          page
        );
      })}
  </div>
);

export default Paginator;
