export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const isUsingEmulator =
  isDevelopment && process.env.NEXT_PUBLIC_USE_EMULATOR === 'false';

export const siteURL = process.env.NEXT_PUBLIC_CLIENT_URL as string;
