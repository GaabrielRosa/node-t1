import { uniqueNamesGenerator, names } from 'unique-names-generator';
import logger from 'pino';

import { getDbConnection } from '..';

const NUMBER_OF_COSTUMERS = 1000;

async function create() {
  const connection = getDbConnection;

  await connection.initialize();

  const forLoop = async () => {
    for await (const iterator of Array.from(Array(NUMBER_OF_COSTUMERS).keys())) {
      const randomName = uniqueNamesGenerator({
        dictionaries: [names]
      })

      await connection.query(`INSERT INTO CLIENT (name) VALUES ('${randomName}')`);
    }
  } 

  await forLoop();

  await connection.destroy();
}

create().then(() => logger().info('Clients created successfully!'));
