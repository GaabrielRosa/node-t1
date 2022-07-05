import request from 'supertest';

import { serverApp } from '@shared/infra/http/server';
import { Database } from '@shared/infra/typeorm/tests/Database';

const database = new Database();

describe('Session Controller', () => {
  describe('Auth', () => {
    beforeAll(async () => {
      const connection = await database.initializeConnection();

      await connection.query(`INSERT INTO "user" (email, name, password) 
        VALUES ('${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);
    })

    afterAll(async () => {
      await database.closeConnection();
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
  });
});