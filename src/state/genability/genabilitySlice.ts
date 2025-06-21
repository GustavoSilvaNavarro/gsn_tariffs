import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GENABILITY_API_URL, GENABILITY_APP_ID, GENABILITY_APP_KEY } from '@/config';
import type { RespLses } from '@/interfaces';

const auth = btoa(`${GENABILITY_APP_ID}:${GENABILITY_APP_KEY}`);

export const genabilitySlice = createApi({
  reducerPath: 'fetchGenabilityData',
  baseQuery: fetchBaseQuery({ baseUrl: GENABILITY_API_URL }),
  endpoints: (builder) => ({
    getAllUtilityData: builder.query<RespLses, { pageStart: number; pageCount: number }>({
      query: ({ pageStart, pageCount }) => ({
        url: `/public/lses?pageStart=${pageStart}&pageCount=${pageCount}&sortOn=totalCustomers&sortOrder=DESC&fields=ext`,
        headers: {
          Authorization: `Basic: ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
  }),
});

export const { useGetAllUtilityDataQuery } = genabilitySlice;
