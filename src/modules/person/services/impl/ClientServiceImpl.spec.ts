import { DataSource } from 'typeorm';
import request from 'supertest';
import { randomUUID } from 'crypto';

import { clientRepositoryMock } from '@modules/person/mocks/ClientMock';
import { ClientDTO } from '@modules/person/models/Client';
import { cacheProviderMock } from '@shared/providers/mocks/CacheProviderMock';
import { ClientServiceImpl } from './ClientServiceImpl';
import { initializeDbConnection } from '@shared/infra/typeorm';
import { serverApp } from '@shared/infra/http/server';
import { redisConnection } from '@shared/infra/redis';

const clientService = new ClientServiceImpl(clientRepositoryMock, cacheProviderMock);

let connection: DataSource;

describe('ClientService', () => {
  describe('Find All', () => {
    const client1: ClientDTO = {
      id: '05854be3-eadb-4067-8b4d-2c316449f220',
      name: 'Pele',
    } 

    const client2: ClientDTO = {
      id: '05854be3-eadb-4067-8b4d-2c316449f220',
      name: 'Romario',
    }

    it('should be able list all clients', async () => {
      clientRepositoryMock.findAll.mockResolvedValueOnce([client1, client2]);
            
      const clientList = await clientService.findAll();

      expect(clientList).toHaveLength(2);
      expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    });

    it('should be able list all clients in cache', async () => {
      cacheProviderMock.recover.mockResolvedValueOnce([client1, client2]);
            
      const clientList = await clientService.findAll();

      expect(clientList).toHaveLength(2);
      expect(cacheProviderMock.recover).toHaveBeenCalledTimes(1);
      expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(0);
    });

    it('should be able list array empty case not found clients', async () => {
      cacheProviderMock.recover.mockResolvedValueOnce(null);
      clientRepositoryMock.findAll.mockResolvedValueOnce([]);
            
      const clientList = await clientService.findAll();

      expect(clientList).toHaveLength(0);
      expect(clientRepositoryMock.findAll).toHaveBeenCalledTimes(1);
      expect(cacheProviderMock.recover).toHaveBeenCalledTimes(1);
    });

    it('should be able save in cache all clients', async () => {
      cacheProviderMock.recover.mockResolvedValueOnce(null);
      clientRepositoryMock.findAll.mockResolvedValueOnce([client1, client2]);
            
      const clientList = await clientService.findAll();

      expect(cacheProviderMock.save).toHaveBeenCalledTimes(1);
      expect(cacheProviderMock.save).toHaveBeenCalledWith('clients-list', [client1, client2]);
    });
  });

  describe('FindAll e2e', () => {
    beforeAll(async () => {
      connection = await initializeDbConnection();
      await connection.runMigrations();

      await connection.query(`INSERT INTO "user" (id, email, name, password) 
        VALUES ('${randomUUID()}','${process.env.SEED_USER_EMAIL}', 'Test', '${process.env.SEED_USER_PASSWORD_HASH}')`);

      await connection.query(`INSERT INTO client (id, name) VALUES ('${randomUUID()}', 'John Doe');`);
      await connection.query(`INSERT INTO client (id, name) VALUES ('${randomUUID()}', 'Jane Doe');`);
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