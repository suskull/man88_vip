interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const generatePageRange = (): number[] => {
    const range: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always show first page
      range.push(1);

      // Calculate start and end of middle range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(maxVisible - 1, totalPages - 1);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - (maxVisible - 2));
      }

      // Add ellipsis if needed
      if (start > 2) {
        range.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        range.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      range.push(totalPages);
    }

    return range;
  };

  const pageRange = generatePageRange();

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pageRange.map((page, index) => {
          if (page === -1) {
            return (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            );
          }

          return (
            <li
              key={page}
              className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

