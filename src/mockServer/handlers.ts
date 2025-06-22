import { http, HttpResponse } from 'msw';
import { mockListUtilities } from '@/components/__mocks__/utilitiesDataMocks';
import { GENABILITY_API_URL } from '@/config';

export const handlers = [
  http.get(`${GENABILITY_API_URL}/public/lses`, () => {
    return HttpResponse.json(mockListUtilities);
  }),
];
