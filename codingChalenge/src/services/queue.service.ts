import PgBoss from 'pg-boss';
import CONFIG from '../config';

const queueService = new PgBoss({
    host: CONFIG.DB_HOST,
    database: CONFIG.DB_NAME,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    application_name: CONFIG.AP_NAME,
    schema: CONFIG.DB_SCHEMA
});

queueService.on('error', error => console.error(error));

queueService.start();

export default queueService;
