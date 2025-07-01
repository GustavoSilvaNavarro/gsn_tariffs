import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GENABILITY_API_URL,
  GENABILITY_APP_ID,
  GENABILITY_APP_KEY,
  CUSTOMER_CLASSES,
  SERVICE_TYPES,
  TARIFF_TYPES,
} from '@/config';
import type { RespLses, PaginationDetails, IResponseTariff } from '@/interfaces';
import { returnNowDateFormatted } from '@/utils';

const auth = btoa(`${GENABILITY_APP_ID}:${GENABILITY_APP_KEY}`);

export const genabilitySlice = createApi({
  reducerPath: 'fetchGenabilityData',
  baseQuery: fetchBaseQuery({ baseUrl: GENABILITY_API_URL }),
  endpoints: (builder) => ({
    getAllUtilityData: builder.query<RespLses, PaginationDetails>({
      query: ({ pageStart, pageCount }) => ({
        url: `/public/lses?pageStart=${pageStart}&pageCount=${pageCount}&sortOn=totalCustomers&sortOrder=DESC&fields=ext`,
        headers: {
          Authorization: `Basic: ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
    getAllTariffData: builder.query<IResponseTariff, PaginationDetails>({
      query: ({ pageStart, pageCount }) => ({
        url: `/public/tariffs?pageStart=${pageStart}&pageCount=${pageCount}&customerClasses=${CUSTOMER_CLASSES}&serviceTypes=${SERVICE_TYPES}&effectiveOn=${returnNowDateFormatted()}&fields=ext`,
        headers: {
          Authorization: `Basic: ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
    getSingleUtilityBasedOnLseId: builder.query<Omit<RespLses, 'pageStart' | 'pageCount'>, string>({
      query: (lseId) => ({
        url: `/public/lses/${lseId}?fields=ext`,
        headers: {
          Authorization: `Basic: ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
    getTariffsByUtilityId: builder.query<IResponseTariff, PaginationDetails & { lseId: string }>({
      query: ({ lseId, pageStart, pageCount }) => ({
        url: `/public/tariffs?lseId=${lseId}&pageStart=${pageStart}&pageCount=${pageCount}&customerClasses=${CUSTOMER_CLASSES}&serviceTypes=${SERVICE_TYPES}&effectiveOn=${returnNowDateFormatted()}&tariffTypes=${TARIFF_TYPES}&fields=ext`,
        headers: {
          Authorization: `Basic: ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetAllUtilityDataQuery,
  useGetAllTariffDataQuery,
  useGetSingleUtilityBasedOnLseIdQuery,
  useGetTariffsByUtilityIdQuery,
} = genabilitySlice;
