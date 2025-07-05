import { useState } from 'react';

export const usePagination = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [recordLimit, setRecordLimit] = useState(10);
  const [recordOffset, setRecordOffset] = useState(0);

  const handleChangePage = (_e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    const nextPage = newPage * recordLimit;
    setPageNumber(newPage);
    setRecordOffset(nextPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecordLimit(+event.target.value);
    setRecordOffset(0);
    setPageNumber(0);
  };

  return { pageNumber, recordOffset, recordLimit, handleChangePage, handleChangeRowsPerPage };
};
