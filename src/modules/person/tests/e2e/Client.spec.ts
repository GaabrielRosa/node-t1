import { DataSource } from 'typeorm';
import request from 'supertest';

import { initializeDbConnection } from '@shared/infra/typeorm';
import { serverApp } from '@shared/infra/http/server';
import { redisConnection } from '@shared/infra/redis';

let connection: DataSource;

describe('Client', () => {
  describe('FindAll', () => {
    beforeAll(async () => {
      await redisConnection.flushall();
      connection = await initializeDbConnection();
      await connection.runMigrations();

      await connection.query(`INSERT INTO "user" (email, name, password) 
        VALUES ('${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);

      await connection.query(`INSERT INTO client (name) VALUES ('John Doe');`);
      await connection.query(`INSERT INTO client (name) VALUES ('Jane Doe');`);
    })
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.destroy();
      await redisConnection.flushall();
      redisConnection.disconnect();
    })

    it('should be able to list all clients', async () => {
      const requestServer = request(serverApp);

      const responseToken = await requestServer
        .post('/auth')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'admin',
        })

      const token = responseToken.body.token;

      const response = await requestServer
        .get('/client')
        .set('Accept', 'application/json')
        .set('Authorization', 'bearer ' + token)

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
    });
  });
});