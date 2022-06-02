import { hash } from 'bcryptjs';
import 'dotenv/config';

import { v4 as UUIDV4 } from 'uuid';

import { getDbConnection } from '..';

async function create() {
  const connection = getDbConnection;

  await connection.initialize();

  const id = UUIDV4();
  const password = await hash(process.env.SEED_USER_PASSWORD || '', 8);

  await connection.query(`INSERT INTO "user" (id, email, name, password) 
    VALUES ('${id}','${process.env.SEED_USER_EMAIL}', 'Test', '${password}')`);

  await connection.destroy();
}

create().then(() => console.log('Test user created successfully!'))
