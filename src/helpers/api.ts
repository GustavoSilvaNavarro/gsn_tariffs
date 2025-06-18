import axios from 'axios';
import { GENABILITY_API_URL, GENABILITY_APP_ID, GENABILITY_APP_KEY } from '@/config';

const auth = btoa(`${GENABILITY_APP_ID}:${GENABILITY_APP_KEY}`);

export const genabilityApi = axios.create({
  baseURL: GENABILITY_API_URL,
  headers: { Authorization: `Basic: ${auth}` },
});
