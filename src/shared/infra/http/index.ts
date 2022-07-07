import { initializeDbConnection } from '../typeorm';
import { serverApp } from './server';
import logger from 'pino';

const PORT = 3000;

(async () => {
  await initializeDbConnection();

  serverApp.listen(PORT, () => {
    logger().info(`🚀 Server started on port ${PORT}`);
  });
})();
