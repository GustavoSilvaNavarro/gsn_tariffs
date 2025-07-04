import { TableBody, TableCell, TableRow } from '@mui/material';
import { tariffHeaderRows } from '@/utils';
import { useState } from 'react';
import { useGetAllTariffDataQuery } from '@/state/genability/genabilitySlice';
import { TableComponent } from './Table/TableComponent';

export const AllTariffDetails = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchPage, setFetchPage] = useState(0);
  const { data, isLoading, isError } = useGetAllTariffDataQuery({ pageCount: rowsPerPage, pageStart: fetchPage });

  const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (!data) return;

    const nextPage = newPage * rowsPerPage;
    setPage(newPage);
    setFetchPage(nextPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;

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

  if (isError || !data) {
    return (
      <div>
        <p>Error...</p>
      </div>
    );
  }

  return (
    <div className="my-10 mx-6">
      <h1 data-testid="cy-utilities-title" className="text-center text-4xl font-bold text-[#020712] pb-8">
        List of Tariffs
      </h1>

      <TableComponent
        data={data}
        page={page}
        headerRows={tariffHeaderRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}>
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
      </TableComponent>
    </div>
  );
};
