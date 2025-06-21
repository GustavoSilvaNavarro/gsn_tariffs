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
    <div className="h-screen overflow-auto">
      <div className="h-full p-8">
        {data ? (
          <Paper sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TableContainer sx={{ flex: 1, overflowY: 'auto' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {utilityRows.map((row) => (
                      <TableCell key={row.id} align={row.align} style={{ backgroundColor: '#121212', color: '#fff' }}>
                        {row.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="h-full">
                  {data.results.map((lse) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={lse.lseId}>
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
    </div>
  );
};
