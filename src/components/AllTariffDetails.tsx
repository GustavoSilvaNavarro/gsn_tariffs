import {
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Table,
  TableHead,
  Paper,
} from '@mui/material';
import { tariffHeaderRows } from '@/utils';
import { useState } from 'react';
import { useGetAllTariffDataQuery } from '@/state/genability/genabilitySlice';

export const AllTariffDetails = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchPage, setFetchPage] = useState(0);
  const { data, isLoading, isError } = useGetAllTariffDataQuery({ pageCount: rowsPerPage, pageStart: fetchPage });

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
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  }

  return (
    <div className="my-10 mx-6">
      <h1 className="text-center text-4xl font-bold text-[#020712] pb-8">List of Tariffs</h1>

      {data ? (
        <TableContainer component={Paper} sx={{ maxHeight: '500px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    color: '#fff',
                    fontSize: '18px',
                    backgroundColor: '#121212',
                  },
                }}>
                {tariffHeaderRows.map((row) => (
                  <TableCell key={row.id} align={row.align}>
                    {row.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((tariff) => (
                <TableRow key={tariff.masterTariffId} hover sx={{ cursor: 'pointer' }}>
                  <TableCell>{tariff.tariffName}</TableCell>
                  <TableCell>{tariff.tariffCode}</TableCell>
                  <TableCell>{tariff.masterTariffId}</TableCell>
                  <TableCell>{tariff.lseName}</TableCell>
                  <TableCell>{tariff.effectiveDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100, 200]}
                  count={data.count}
                  rowsPerPage={data.pageCount}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </div>
  );
};
