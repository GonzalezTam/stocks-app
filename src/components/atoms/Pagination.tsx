import React from 'react';
import { TablePagination } from '@mui/material';

interface PaginationProps {
  count: number;
  rowsPerPage: number;
	labelRowsPerPage?: string;
  page: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  rowsPerPage,
  page,
	labelRowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    labelRowsPerPage={labelRowsPerPage}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
  />
);

export default Pagination;
