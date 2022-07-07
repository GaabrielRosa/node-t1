import 'dotenv/config';
import logger from 'pino';

import { getDbConnection } from '..';

async function create() {
  const connection = getDbConnection;
  await connection.initialize();

  await connection.query(`INSERT INTO "user" (email, name, password) 
    VALUES ('${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);

  await connection.destroy();
}

create().then(() => logger().info('Test user created successfully!'));
