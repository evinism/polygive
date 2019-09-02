
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8000';
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);
export const REDIS_DB = parseInt(process.env.REDIS_PORT || '0', 10);
export const REDIS_PASS = process.env.REDIS_PASS;
export const REDIS_SOCKET = process.env.REDIS_SOCKET;
export const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat';
export const DATABASE_URL = process.env.DATABASE_URL || 'postgres://polygiveuser@localhost:5432/polygive';
