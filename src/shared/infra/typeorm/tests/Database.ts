import { DataSource } from 'typeorm';

import { redisConnection } from '../../redis';
import { defaultDbConnectionOptions, initializeDbConnection } from '..';

class Database {
  private connection: DataSource;

  public async initializeConnection(): Promise<DataSource> {
    await this.create();

    await redisConnection.flushall();
       
    this.connection = await initializeDbConnection();
    await this.connection.runMigrations();

    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    await redisConnection.flushall();
    redisConnection.disconnect();

    await this.connection.destroy();

    await this.drop();
  }

  private async create(): Promise<void> {
    const connection = await new DataSource(defaultDbConnectionOptions).initialize();
    
    const queryRunner = connection.createQueryRunner();
    await queryRunner.createDatabase(process.env.DATABASE_DB_TEST || '', true);
    
    await connection.destroy();
  }

  private async drop(): Promise<void> {
    const connection = await new DataSource(defaultDbConnectionOptions).initialize();
    
    const queryRunner = connection.createQueryRunner();
    await queryRunner.dropDatabase(process.env.DATABASE_DB_TEST || '', true);
    
    await connection.destroy();
  }
}

export { Database }
