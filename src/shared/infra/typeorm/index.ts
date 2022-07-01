import { DataSource } from 'typeorm';

const DATABASE_HOST = 'dbpostgres';
const DATABASE_USER = 'postgres';
const DATABASE_PORT = 5432;
const DATABASE_PASSWORD = 'postgres';
const DATABASE_DB = 'database_postgres';

const entities = [
  'src/modules/**/infra/typeorm/entities/*.ts',
];

export const getDbConnection = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'test' ? 'dbpostgrestest' : DATABASE_HOST,
  port: DATABASE_PORT, 
  username: DATABASE_USER, 
  password: DATABASE_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? 'database_postgres_test' : DATABASE_DB,
  entities: entities,
  migrations: ['src/shared/infra/typeorm/migrations/*{.ts,.js}'],
});

export async function initializeDbConnection() {
  return await getDbConnection.initialize();
}
