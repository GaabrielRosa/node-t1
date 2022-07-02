import { clientRepositoryMock } from '@modules/person/tests/mocks/ClientMock';
import { ClientDTO } from '@modules/person/models/Client';
import { cacheProviderMock } from '@shared/providers/mocks/CacheProviderMock';
import { ClientServiceImpl } from '@modules/person/services/impl/ClientServiceImpl';

const clientService = new ClientServiceImpl(clientRepositoryMock, cacheProviderMock);

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
});