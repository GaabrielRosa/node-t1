import { v4 as UUIDV4 } from 'uuid';
import { uniqueNamesGenerator, names } from 'unique-names-generator';

import { getDbConnection } from '..';

const NUMBER_OF_COSTUMERS = 1000;

async function create() {
  const connection = getDbConnection;

  await connection.initialize();

  const forLoop = async () => {
    for await (const iterator of Array.from(Array(NUMBER_OF_COSTUMERS).keys())) {
      const id = UUIDV4();
      const randomName = uniqueNamesGenerator({
        dictionaries: [names]
      })

      await connection.query(`INSERT INTO CLIENT (id, name) VALUES ('${id}', '${randomName}')`);
    }
  } 

  await forLoop();

  await connection.destroy();
}

create().then(() => console.log('Clients created successfully!'))
