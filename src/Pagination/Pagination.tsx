import React from "react";

interface PaginationProps {
  table: any;
  totalItems: number;
  showTotal?: boolean;
  loading?: boolean;
  showPageSize?: boolean;
  showPageInfo?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  table,
  totalItems,
  showTotal = true,
  loading = false,
  showPageSize = true,
  showPageInfo = true,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className = "",
}) => {
  return (
    <div className={`pagination ${className}`}>
      <div className="pagination-left">
        {showTotal && (
          <div className="total-items">
            Total: <strong>{totalItems}</strong>
          </div>
        )}
        {loading && <span className="loading-text">Updating...</span>}
      </div>
      <div className="pagination-navigation">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="pagination-button"
        >
          Previous
        </button>

        {showPageInfo && (
          <div className="pagination-page-info">
            Page{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="font-medium">{table.getPageCount()}</span>
          </div>
        )}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      {showPageSize && (
        <div className="pagination-page-size">
          <span>Show:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="pagination-select"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
