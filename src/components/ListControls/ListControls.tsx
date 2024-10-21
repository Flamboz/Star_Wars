import React from "react";
import "./ListControls.css";

interface ListControlsProps {
  previousURL: string | null;
  nextURL: string | null;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ListControls component: Provides navigation controls for paginated lists,allowing users to navigate to the previous or next set of items. 
// Buttons are disabled when there is no available URL for navigation or while loading.
const ListControls: React.FC<ListControlsProps> = ({
  previousURL,
  nextURL,
  isLoading,
  onPrevious,
  onNext,
  onFirstPage,
  onLastPage,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(currentPage + 1, totalPages);

    if (endPage - startPage < 2) {
      if (startPage === 1) {
        endPage = Math.min(3, totalPages);
      } else {
        startPage = Math.max(1, endPage - 2);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`list-controls__page-number ${
            currentPage === i ? "list-controls__page-number--active" : ""
          }`}
          onClick={() => onPageChange(i)}
          disabled={isLoading}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <footer className="list-controls">
      <button
        className="list-controls__control"
        onClick={onFirstPage}
        disabled={currentPage === 1 || isLoading}
      >
        First
      </button>
      <button
        className="list-controls__control"
        onClick={onPrevious}
        disabled={!previousURL || isLoading}
      >
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        className="list-controls__control"
        onClick={onNext}
        disabled={!nextURL || isLoading}
      >
        {">"}
      </button>
      <button
        className="list-controls__control"
        onClick={onLastPage}
        disabled={currentPage === totalPages || isLoading}
      >
        Last
      </button>
    </footer>
  );
};

export default ListControls;
