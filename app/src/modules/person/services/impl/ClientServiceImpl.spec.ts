import 'reflect-metadata';
import { clientRepositoryMock } from '@modules/person/mocks/ClientMock';
import { ClientDTO } from '@modules/person/models/Client';
import { ClientServiceImpl } from './ClientServiceImpl';

const clientService = new ClientServiceImpl(clientRepositoryMock);

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
  });
});