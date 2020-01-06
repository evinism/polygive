import React from "react";

interface PaginatorProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

function onlyUnique(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index;
}

const Paginator = ({
  page: currentPage,
  totalPages,
  setPage
}: PaginatorProps) => {
  const pagesToDisplay = [
    1,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    totalPages
  ]
    .filter(page => page > 0 && page <= totalPages)
    .filter(onlyUnique);
  pagesToDisplay.sort((a, b) => a - b);
  const renderArray: JSX.Element[] = [];
  for (let i = 0; i < pagesToDisplay.length; i++) {
    const page = pagesToDisplay[i];
    renderArray.push(
      currentPage !== page ? (
        <button onClick={() => setPage(page)}>{page}</button>
      ) : (
        <span>{page}</span>
      )
    );

    const followingLink = pagesToDisplay[i + 1];
    if (followingLink && followingLink > page + 1) {
      renderArray.push(<span>...</span>);
    }
  }

  return <div>{renderArray}</div>;
};

export default Paginator;
