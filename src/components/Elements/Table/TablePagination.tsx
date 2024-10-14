import clsx from 'clsx';

import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useTableContextData } from './Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TablePaginationProps {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = (props: TablePaginationProps) => {
  const { isFetching } = useTableContextData();
  const { count, page, rowsPerPage, onPageChange } = props;
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <div className="p-4 flex w-full items-center flex-wrap gap-3 justify-between">
      {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
        <span className="font-semibold text-gray-900 dark:text-white">{count}</span>
      </span> */}
      <div>
        {isFetching && <p className="font-medium text-sm animate-pulse">Fetching data...</p>}
      </div>
      <Pagination currentPage={page} onPageChange={onPageChange} totalPages={totalPages} />
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const maxVisiblePages = 3; // Adjust this value to change the number of visible pages

  // Create an array of page numbers to show
  const visiblePages = generateVisiblePages(currentPage, totalPages, maxVisiblePages);

  return (
    <nav aria-label="Table navigation ml-auto">
      <ul className="inline-flex items-center gap-1 flex-wrap">
        <li>
          <button
            disabled={prevPage < 1}
            onClick={() => onPageChange(prevPage)}
            className={clsx(
              'transition-colors w-8 h-8 flex items-center justify-center first-letter text-sm font-medium border rounded-md focus:shadow-outline',
              prevPage < 1
                ? 'dark:bg-gray-500 bg-gray-200 dark:border-gray-500'
                : 'dark:border-gray-500 border-gray-200',
              'disabled:cursor-not-allowed'
            )}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="" />
          </button>
        </li>
        {visiblePages.map((page, index) => (
          <li key={index} className={`mx-1 ${page === currentPage ? 'font-bold' : ''}`}>
            {page === 'ellipsis' ? (
              <span className="mx-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={clsx(
                  'transition-colors min-w-[2rem] p-1 h-8 first-letter text-sm font-semibold border rounded-md focus:shadow-outline',
                  currentPage === page ? 'border-bgDark-500 text-bgDark-500' : 'dark:border-gray-500'
                )}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            disabled={nextPage > totalPages}
            onClick={() => onPageChange(nextPage)}
            className={clsx(
              'transition-colors w-8 h-8 flex items-center justify-center first-letter text-sm font-medium border rounded-md focus:shadow-outline',
              nextPage > totalPages
                ? 'dark:bg-gray-500 bg-gray-200 dark:border-gray-500'
                : 'dark:border-gray-500 border-gray-200',
              'disabled:cursor-not-allowed'
            )}
          >
            <FontAwesomeIcon icon={faArrowRight} className="" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;

function generateVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): (number | 'ellipsis')[] {
  const visiblePages: (number | 'ellipsis')[] = [];

  // If there are less pages than the maximum number of visible pages, show all pages
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  }

  // Determine the range of pages to show
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
  let startPage = currentPage - halfMaxVisiblePages;
  let endPage = currentPage + halfMaxVisiblePages;

  if (startPage < 1) {
    startPage = 1;
    endPage = startPage + maxVisiblePages - 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = endPage - maxVisiblePages + 1;
  }

  // Add the first page
  if (startPage > 1) {
    visiblePages.push(1);
    if (startPage > 2) {
      visiblePages.push('ellipsis'); // Add an ellipsis
    }
  }

  // Add the pages between the first and last visible pages
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // Add the last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      visiblePages.push('ellipsis'); // Add an ellipsis
    }
    visiblePages.push(totalPages);
  }

  return visiblePages;
}
