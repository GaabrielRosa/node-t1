import { DataSource } from 'typeorm';

const DATABASE_HOST = 'gdb';
const DATABASE_USER = 'postgres';
const DATABASE_PORT = 5432;
const DATABASE_PASSWORD = 'postgres';
const DATABASE_DB = 'database_postgres';

const entities = [
  'src/modules/**/infra/typeorm/entities/*.ts',
];

export const getDbConnection = new DataSource({
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT, 
  username: DATABASE_USER, 
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  entities: entities,
});

export async function initializeDbConnection() {
  return await getDbConnection.initialize();
}
