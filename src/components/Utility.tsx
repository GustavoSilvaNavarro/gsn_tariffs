import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { utilityRows } from '@/utils';
import { useGetAllUtilityDataQuery } from '@/state/genability/genabilitySlice';
import './utility.css';

export const Utility = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchPage, setFetchPage] = useState(0);
  const { data, isLoading, isError } = useGetAllUtilityDataQuery({ pageStart: fetchPage, pageCount: rowsPerPage });

  const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const nextPage = newPage * rowsPerPage;
    setPage(newPage);
    setFetchPage(nextPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setFetchPage(0);
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <div className="my-10 mx-6">
      <h1 data-testid="cy-utilities-title" className="text-center text-4xl font-bold text-[#020712] pb-8">
        List of Utilities
      </h1>

      {data ? (
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }} data-testid="cy-utilities-table-data">
          <TableContainer className="tableContainer">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ '& th': { color: '#fff', fontSize: '18px', backgroundColor: '#121212' } }}>
                  {utilityRows.map((row) => (
                    <TableCell key={row.id} align={row.align}>
                      {row.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((lse) => (
                  <TableRow
                    data-testid={`cy-row-${lse.lseId}`}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={lse.lseId}
                    sx={{ cursor: 'pointer' }}>
                    <TableCell className="min-w-xs">{lse.name}</TableCell>
                    <TableCell>{lse.lseCode}</TableCell>
                    <TableCell className="max-w-xs break-words">{lse.websiteHome}</TableCell>
                    <TableCell align="center">
                      {lse.totalCustomers !== null ? lse.totalCustomers.toLocaleString('en-US') : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            data-testid="cy-utilities-pagination"
            rowsPerPageOptions={[10, 25, 100, 200]}
            component="div"
            count={data.count}
            rowsPerPage={data.pageCount}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : null}
    </div>
  );
};
