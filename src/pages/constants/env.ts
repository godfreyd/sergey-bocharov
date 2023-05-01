import getConfig from 'next/config';

const { publicRuntimeConfig = {} } = getConfig() || {};

const NODE_ENV = publicRuntimeConfig;

/** GOOGLE */
export const GOOGLE_ANALYTICS_ID =
    NODE_ENV.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';
