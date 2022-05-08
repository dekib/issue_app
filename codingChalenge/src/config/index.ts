import environment from 'dotenv';

const env = environment.config();
if (env.error) {
  throw env.error;
}

const {
  AP_NAME,
  PORT,
  NODE_ENV,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA
} = process.env;

export enum ApplicationEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development'
}

const ENV: ApplicationEnv = NODE_ENV as ApplicationEnv || ApplicationEnv.DEVELOPMENT;
const CONFIG = {
  NODE_ENV: ENV,
  PORT: +PORT,
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_SCHEMA,
  AP_NAME,
};

export default CONFIG;
