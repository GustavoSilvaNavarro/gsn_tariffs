import { TableBody, TableCell, TableRow } from '@mui/material';
import { TableComponent } from '@/components/Table/TableComponent';
import { useGetAllUtilityDataQuery } from '@/state/genability/genabilitySlice';
import { utilityRows } from '@/utils';
import { useNavigate } from 'react-router';
import { usePagination } from '@/hooks/paginationHook';

export const Utilities = () => {
  const navigate = useNavigate();
  const { pageNumber, recordLimit, recordOffset, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { data, isLoading, isError } = useGetAllUtilityDataQuery({ pageStart: recordOffset, pageCount: recordLimit });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error...</div>;
  }

  return (
    <div className="my-10 mx-6">
      <h1 data-testid="cy-utilities-title" className="text-center text-4xl font-bold text-[#020712] pb-8">
        List of Utilities
      </h1>

      {data ? (
        <TableComponent
          headerRows={utilityRows}
          data={data}
          page={pageNumber}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}>
          <TableBody>
            {data.results.map((lse) => (
              <TableRow
                data-testid={`cy-row-${lse.lseId}`}
                hover
                role="checkbox"
                tabIndex={-1}
                key={lse.lseId}
                onClick={() => navigate(`/utilities/${lse.lseId}`)}
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
      ) : null}
    </div>
  );
};
