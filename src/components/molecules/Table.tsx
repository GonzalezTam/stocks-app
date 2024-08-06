import React, { useState, useEffect } from 'react';
import { StockInterface, ColumnInterface } from './../../types';
import Paper from '@mui/material/Paper';
import {
  Table as MUITable,
  CircularProgress,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Pagination from '../atoms/Pagination';
import CustomLink from '../atoms/CustomLink';

interface TableProps {
  data?: StockInterface[];
  loading: boolean;
  error: string | null;
}

const columns: readonly ColumnInterface[] = [
  { id: 'symbol', label: 'Symbol', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 400 },
  { id: 'currency', label: 'Currency', minWidth: 50 },
  { id: 'type', label: 'Type', minWidth: 150 },
];

const Table: React.FC<TableProps> = ({ data, loading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) =>
    setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} style={{ height: '330px' }}>
            <CircularProgress sx={{ m: 'auto', display: 'block' }} />
          </TableCell>
        </TableRow>
      );
    }

    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Typography
              variant="body1"
              color="error"
              align="center"
              sx={{ fontSize: '0.875rem', lineHeight: '1.43rem' }}
            >
              {error}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (!data || data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ fontSize: '0.875rem', lineHeight: '1.43rem' }}
            >
              0 results found
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => {
        return (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.symbol}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '&:first-of-type td, &:first-of-type th': { paddingTop: 1 },
            }}
          >
            {columns.map((column) => {
              const value = row[column.id];
              return (
                <TableCell key={column.id} style={{ maxWidth: '400px' }}>
                  {column.label === 'Symbol' ? (
                    <CustomLink
                      to={`/${row.exchange}/${row.symbol}`}
                      state={{ stock: row }}
                      customStyles={{
                        color: '#576dd5',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                      }}
                    >
                      {value}
                    </CustomLink>
                  ) : (
                    value
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
  };

  useEffect(() => setPage(0), [data]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <MUITable stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  sx={(theme) => ({
                    fontWeight: 'bold',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                  })}
                >
                  {column.label.toUpperCase()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{renderContent()}</TableBody>
        </MUITable>
      </TableContainer>
      <Pagination
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Stocks per page"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Table;
