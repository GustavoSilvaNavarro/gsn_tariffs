// ! APP SETUP
export const ENVIRONMENT = (import.meta.env.VITE_ENVIRONMENT as string | undefined) ?? 'dev';
export const LOG_LEVEL = ENVIRONMENT === 'test' ? 'DEBUG' : 'INFO';

// ! Genability API configuration
export const GENABILITY_API_URL = import.meta.env.VITE_GENABILITY_BASE_URL as string | undefined;
export const GENABILITY_APP_ID = import.meta.env.VITE_GENABILITY_APP_ID as string | undefined;
export const GENABILITY_APP_KEY = import.meta.env.VITE_GENABILITY_APP_KEY as string | undefined;
