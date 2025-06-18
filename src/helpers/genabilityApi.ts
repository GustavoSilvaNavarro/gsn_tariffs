import { genabilityApi } from './api';
import logger from '@/adapters/logger';
import type { RespLses } from '@/interfaces';

export const getAllUtilityDetails = async (pageStart = 0) => {
  // try {
  const resp = await genabilityApi.get<RespLses>(
    `/public/lses?pageStart=${pageStart}&pageCount=25&sortOn=totalCustomers&sortOrder=DESC&fields=ext`,
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  logger.info(resp.data);
  return resp.data.results;
  // } catch (err) {
  //   logger.error('Error retrieving utility data from genability', err);
  //   return null;
  // }
};
