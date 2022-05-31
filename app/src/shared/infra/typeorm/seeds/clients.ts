import { hash } from 'bcrypt';
import { v4 as UUIDV4 } from 'uuid';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

import { getDbConnection } from '..';

const NUMBER_OF_COSTUMERS = 100;

async function create() {
  const connection = getDbConnection;

  await connection.initialize();

  for (let index = 0; index < NUMBER_OF_COSTUMERS; index++) {
    const id = UUIDV4();
    const randomName = uniqueNamesGenerator({
      dictionaries: [names]
    })
    
    await connection.query(`INSERT INTO CLIENT (id, name) VALUES ('${id}', '${randomName}')`);
  }

  await connection.destroy();
}

create().then(() => console.log('Clients created successfully!'))
