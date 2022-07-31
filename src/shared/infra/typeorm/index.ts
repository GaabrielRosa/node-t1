import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const defaultDbConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), 
  username: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD,
  entities: [process.env.TYPEORM_ENTITIES || ''],
  migrations: [process.env.TYPEORM_MIGRATIONS || ''],
  database: process.env.DATABASE_DB,
} as DataSourceOptions;

export const getDbConnection = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT), 
  username: process.env.DATABASE_USER, 
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [process.env.TYPEORM_ENTITIES || ''],
  migrations: [process.env.TYPEORM_MIGRATIONS || ''],
});

export async function initializeDbConnection() {
  return getDbConnection.initialize();
}
