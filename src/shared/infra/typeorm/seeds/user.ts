import 'dotenv/config';

import { randomUUID } from 'crypto';

import { getDbConnection } from '..';

async function create() {
  const connection = getDbConnection;
  await connection.initialize();

  await connection.query(`INSERT INTO "user" (id, email, name, password) 
    VALUES ('${randomUUID()}','${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);

  await connection.destroy();
}

create().then(() => console.log('Test user created successfully!'))
