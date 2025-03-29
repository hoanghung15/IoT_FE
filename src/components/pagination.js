import React from "react";

const Pagination = ({
  pageNo,
  totalPages,
  setPageNo,
  dataTableLength,
  totalItems,
}) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(0, pageNo - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${pageNo === i ? "active" : ""}`}>
          <button className="page-link" onClick={() => setPageNo(i)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="w-full flex justify-between items-center mt-[16px]">
      <p>
        Hiển thị <span className="font-bold">{dataTableLength}</span> /
        <span className="font-bold"> {totalItems}</span> bản ghi
      </p>
      <ul className="pagination">
        {/* Trước */}
        <li className={`page-item ${pageNo === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => pageNo > 0 && setPageNo(pageNo - 1)}
            disabled={pageNo === 0}
          >
            Trước
          </button>
        </li>

        {renderPageNumbers()}

        {/* Sau */}
        <li
          className={`page-item ${pageNo === totalPages - 1 ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => pageNo < totalPages - 1 && setPageNo(pageNo + 1)}
            disabled={pageNo === totalPages - 1}
          >
            Sau
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
