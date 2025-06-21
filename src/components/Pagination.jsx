import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul className="pagination-container bg-white p-4 border-t border-[#E0E0E0] mx-auto max-w-3xl w-[90%] justify-between">
      {/* Left Arrow key */}
      <li
        onClick={onPrevious}
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
      >
        <div className="arrow left"></div>
      </li>

      {paginationRange.map((pageNum, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNum === DOTS) {
          return (
            <li
              onClick={() => onPageChange(paginationRange[index - 1] + 1)}
              key={index}
              className="pagination-item dots"
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={index}
            onClick={() => onPageChange(pageNum)}
            className={`pagination-item ${
              pageNum === currentPage ? "selected" : ""
            }`}
          >
            {pageNum}
          </li>
        );
      })}

      {/* Right Naviation Arrow */}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow right"></div>
      </li>
    </ul>
  );
};

export default Pagination;
