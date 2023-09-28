import React from 'react';
import './AllPagination.css'
import Pagination from '@mui/material/Pagination';

function AllPagination( {page, setPage} ) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  const totalPages = 500;

  return (
    <>
      <Pagination sx = {{ mt: 12 }} count={totalPages} color="primary" siblingCount={0} onChange={handleChange}/> 
    </>
  );
}

export default AllPagination;