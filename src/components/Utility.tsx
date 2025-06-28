import { useState } from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { TableComponent } from '@/components/Table/TableComponent';
import { useGetAllUtilityDataQuery } from '@/state/genability/genabilitySlice';
import { utilityRows } from '@/utils';

export const Utility = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fetchPage, setFetchPage] = useState(0);
  const { data, isLoading, isError } = useGetAllUtilityDataQuery({ pageStart: fetchPage, pageCount: rowsPerPage });

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
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error...</div>;
  }

  return (
    <TableComponent
      headerRows={utilityRows}
      data={data}
      page={page}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      title="List of Utilities">
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
    </TableComponent>
  );
};
