import request from 'supertest';

import { serverApp } from '@shared/infra/http/server';
import { Database } from '@shared/infra/typeorm/tests/Database';

const database = new Database();

describe('Client Controller', () => {
  describe('FindAll', () => {
    beforeAll(async () => {
      const connection = await database.initializeConnection();
      
      await connection.query(`INSERT INTO "user" (email, name, password) 
        VALUES ('${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);

      await connection.query(`INSERT INTO client (name) VALUES ('John Doe');`);
      await connection.query(`INSERT INTO client (name) VALUES ('Jane Doe');`);
    })
  
    afterAll(async () => {
      await database.closeConnection();
    })

    it('should be able to list all clients', async () => {
      const requestServer = request(serverApp);

      const responseToken = await requestServer
        .post('/auth')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: process.env.TEST_USER_PASSWORD,
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