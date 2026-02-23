export const API_BASE_URL = 'https://dummyjson.com';

// API-side pagination limits — keeps payloads small and pages fast
export const USERS_LIMIT = 10;
export const PRODUCTS_LIMIT = 12;

// Cache time-to-live: cached data older than 5 minutes is refetched
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
