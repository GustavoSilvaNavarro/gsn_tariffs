import { TableBody, TableCell, TableRow } from '@mui/material';
import { tariffHeaderRows } from '@/utils';
import { useGetAllTariffDataQuery } from '@/state/genability/genabilitySlice';
import { TableComponent } from './Table/TableComponent';
import { usePagination } from '@/hooks/paginationHook';

export const AllTariffDetails = () => {
  const { recordLimit, recordOffset, pageNumber, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { data, isLoading, isError } = useGetAllTariffDataQuery({ pageCount: recordLimit, pageStart: recordOffset });

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

      {data && data.results.length ? (
        <TableComponent
          data={data}
          page={pageNumber}
          headerRows={tariffHeaderRows}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}>
          <TableBody>
            {data.results.map((tariff) => (
              <TableRow key={tariff.masterTariffId} hover sx={{ cursor: 'pointer' }}>
                <TableCell className="max-w-xs break-words">{tariff.tariffName}</TableCell>
                <TableCell className="max-w-xs break-words">{tariff.tariffCode}</TableCell>
                <TableCell>{tariff.masterTariffId}</TableCell>
                <TableCell className="max-w-xs break-words">{tariff.lseName}</TableCell>
                <TableCell align="center">{tariff.effectiveDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableComponent>
      ) : null}
    </div>
  );
};
