import { initializeDbConnection } from '../typeorm';
import { serverApp } from './server';

const PORT = 3000;

(async () => {
  await initializeDbConnection();

  serverApp.listen(PORT, () => {
    console.log('Server started on port '+PORT);
  });
})();
