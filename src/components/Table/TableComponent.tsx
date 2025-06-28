import type { JSX } from 'react';
import { TableCell, TableContainer, TableRow, Table, TableHead, Paper, TablePagination } from '@mui/material';
import type { HeaderRows, RespLses, IResponseTariff } from '@/interfaces';

type Props = {
  children: JSX.Element;
  headerRows: Array<HeaderRows>;
  title: string;
  data: RespLses | IResponseTariff;
  page: number;
  handleChangePage: (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TableComponent = ({
  headerRows,
  title,
  children,
  page,
  data,
  handleChangePage,
  handleChangeRowsPerPage,
}: Props) => {
  return (
    <div className="my-10 mx-6">
      <h1 data-testid="cy-utilities-title" className="text-center text-4xl font-bold text-[#020712] pb-8">
        {title}
      </h1>

      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px' }} data-testid="cy-utilities-table-data">
        <TableContainer className="tableContainer">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ '& th': { color: '#fff', fontSize: '18px', backgroundColor: '#121212' } }}>
                {headerRows.map((row) => (
                  <TableCell key={row.id} align={row.align}>
                    {row.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {children}
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
    </div>
  );
};
