import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const entities = ['src/modules/**/infra/typeorm/entities/*.ts'];
const migrations = ['src/shared/infra/typeorm/migrations/*{.ts,.js}'];

export const defaultDbConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), 
  username: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD,
  entities,
  migrations,
  database: process.env.DATABASE_DB,
} as DataSourceOptions;

export const getDbConnection = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), 
  username: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_DB_TEST : process.env.DATABASE_DB,
  entities,
  migrations,
});

export async function initializeDbConnection() {
  return await getDbConnection.initialize();
}
