import express from 'express';
import v1 from './routes/api';
import { createServer } from 'http';
import CONFIG from './config';

const app = express();

app.use(v1);

const server = createServer(app);

server.listen(+CONFIG.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is listening on port: ${+CONFIG.PORT}`);
    // todo logger
  });

  server.timeout = 100000;

  export default app;
