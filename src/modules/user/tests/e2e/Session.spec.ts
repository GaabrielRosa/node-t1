import { DataSource } from 'typeorm';
import request from 'supertest';

import { initializeDbConnection } from '@shared/infra/typeorm';
import { serverApp } from '@shared/infra/http/server';
import { redisConnection } from '@shared/infra/redis';

let connection: DataSource;

describe('Auth', () => {
  describe('Session', () => {
    beforeAll(async () => {
      await redisConnection.flushall();
      connection = await initializeDbConnection();
      await connection.runMigrations();

      await connection.query(`INSERT INTO "user" (email, name, password) 
        VALUES ('${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);
    })
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.destroy();
      await redisConnection.flushall();
      redisConnection.disconnect();
    })

    it('should be able to create a new session', async () => {
      const response = await request(serverApp)
        .post('/auth')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'admin',
        })

      expect(response.status).toBe(200);
    });

    it('should not be able to create a new session with email incorrect', async () => {
      const response = await request(serverApp)
        .post('/auth')
        .set('Accept', 'application/json')
        .send({
          email: 'inalid-email',
          password: 'admin',
        })

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User not found')
    });

    it('should not be able to create a new session with password incorrect', async () => {
      const response = await request(serverApp)
        .post('/auth')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'invalid-password',
        })

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Incorrect password.')
    });
  });
});