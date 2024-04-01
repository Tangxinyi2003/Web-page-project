const developmentBaseUrl = '/';
const productionBaseUrl = '';


export const BASE_URL = process.env.NODE_ENV === 'development' ? developmentBaseUrl : productionBaseUrl;
export const TIMEOUT = 15000;
