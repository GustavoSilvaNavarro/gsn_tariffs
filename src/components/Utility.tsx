import {
  useGetSingleUtilityBasedOnLseIdQuery,
  useGetTariffsByUtilityIdQuery,
} from '@/state/genability/genabilitySlice';
import { TableRow, TableCell, TableBody } from '@mui/material';
import { TableComponent } from './Table/TableComponent';
import { tariffHeaderRows } from '@/utils';
import { usePagination } from '@/hooks/paginationHook';

type UtilityProps = {
  lseId: string;
};

export const Utility = ({ lseId }: UtilityProps) => {
  const { pageNumber, recordLimit, recordOffset, handleChangePage, handleChangeRowsPerPage } = usePagination();
  const { data, isLoading, isError } = useGetSingleUtilityBasedOnLseIdQuery(lseId);
  const {
    data: tariffData,
    isError: tariffError,
    isLoading: tariffLoading,
  } = useGetTariffsByUtilityIdQuery({ lseId, pageCount: recordLimit, pageStart: recordOffset });

  if (isLoading || tariffLoading) {
    return <div>Loading...</div>;
  }

  if (isError || tariffError) {
    return <div>Error...</div>;
  }

  return (
    <section className="flex-1 h-screen overflow-auto">
      <div className="bg-[#f5f5f5] py-4 px-6">
        <h1 className="text-2xl">
          {data?.results[0].name} ({data?.results[0].lseCode})
        </h1>
        <a
          className="font-thin text-sky-700 hover:underline"
          href={data?.results[0].websiteHome}
          target="_blank"
          rel="noreferrer">
          {data?.results[0].websiteHome}
        </a>
      </div>

      <div className="my-5 mx-6">
        {tariffData ? (
          <TableComponent
            headerRows={tariffHeaderRows}
            data={tariffData}
            page={pageNumber}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}>
            <TableBody>
              {tariffData.results.map((tariff) => (
                <TableRow
                  data-testid={`cy-row-${tariff.masterTariffId}`}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={tariff.masterTariffId}>
                  <TableCell>{tariff.lseCode}</TableCell>
                  <TableCell>{tariff.tariffName}</TableCell>
                  <TableCell>{tariff.tariffCode}</TableCell>
                  <TableCell>{tariff.tariffType}</TableCell>
                  <TableCell>{tariff.effectiveDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        ) : null}
      </div>
    </section>
  );
};
