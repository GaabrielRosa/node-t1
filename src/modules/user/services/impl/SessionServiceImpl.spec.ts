import { DataSource } from 'typeorm';
import request from 'supertest';
import { randomUUID } from 'crypto';

import { hashProviderMock } from '@modules/user/mocks/HashProviderMock';
import { userDataMock, userServiceMock } from '@modules/user/mocks/UserMock';
import { User } from '@modules/user/models/User';
import AppError from '@shared/errors/AppError';
import { initializeDbConnection } from '@shared/infra/typeorm';
import { SessionServiceImpl } from './SessionServiceImpl';
import { serverApp } from '@shared/infra/http/server';
import { redisConnection } from '@shared/infra/redis';

const sessionServiceImplMock = new SessionServiceImpl(userServiceMock, hashProviderMock);

let connection: DataSource;

describe('SessionService', () => {

  describe('Auth', () => {
    it('should return an error if user password incorrectly', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce(userDataMock as User);
      hashProviderMock.compareHash.mockResolvedValueOnce(false);

      await sessionServiceImplMock.auth({ email: userDataMock.email, password: 'password-invalid' }).catch(e => {
        expect(e).toBeInstanceOf(AppError);
        expect(e).toMatchObject({
            message: `Incorrect password.`
        });
      });
      expect(userServiceMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userDataMock.email);
      expect(hashProviderMock.compareHash).toHaveBeenCalledTimes(1);
      expect(hashProviderMock.compareHash).toHaveBeenCalledWith('password-invalid', userDataMock.password);
    });

    it('should be able create a new auth', async () => {
      userServiceMock.findByEmail.mockResolvedValueOnce(userDataMock as User);
      hashProviderMock.compareHash.mockResolvedValueOnce(true);

      const auth = await sessionServiceImplMock.auth({ email: userDataMock.email, password: userDataMock.password });

      expect(userServiceMock.findByEmail).toHaveBeenCalledTimes(1);
      expect(userServiceMock.findByEmail).toHaveBeenCalledWith(userDataMock.email);
      expect(hashProviderMock.compareHash).toHaveBeenCalledTimes(1);
      expect(hashProviderMock.compareHash).toHaveBeenCalledWith(userDataMock.password, userDataMock.password);
      expect(auth).toHaveProperty('token');
    });
  });

  describe('Auth e2e', () => {
    beforeAll(async () => {
      connection = await initializeDbConnection();
      await connection.runMigrations();

      await connection.query(`INSERT INTO "user" (id, email, name, password) 
        VALUES ('${randomUUID()}','${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);
    })
  
    afterAll(async () => {
      await connection.dropDatabase();
      await connection.destroy();
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