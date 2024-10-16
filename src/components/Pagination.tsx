import { Button, Box } from '@mui/material';
import { Pagination } from '../types';

const TodoPagination = ({
  totalTodos,
  perPageTodos,
  currentPage,
  setCurrentPage,
}: Pagination) => {
  //total pages and how many number of pages are shown
  const totalPages = Math.ceil(totalTodos / perPageTodos);
  const showPages = 4;

  //Previous Button
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //Next Button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  //handle numbering of pages
  const ShowPages = () => {
    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    const end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        ml: '40rem',
      }}
    >
      <Button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        sx={{ margin: '0 5px' }}
      >
        Previous
      </Button>

      {/* Show pages */}
      {ShowPages().map((pageNum) => (
        <Button
          key={pageNum}
          onClick={() => setCurrentPage(pageNum)}
          variant={currentPage === pageNum ? 'contained' : 'outlined'}
          sx={{ margin: '0 5px' }}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        sx={{ margin: '0 5px' }}
      >
        Next
      </Button>
    </Box>
  );
};

export default TodoPagination;
