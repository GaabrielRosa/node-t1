import { ClientRepositoryImpl } from '@modules/person/infra/typeorm/repositories/ClientRepositoryImpl';
import { fakeClientRepository } from '@modules/person/mocks/ClientMock';
import { ClientDTO } from '@modules/person/models/Client';
import { ClientServiceImpl } from './ClientServiceImpl';

let clientService: ClientServiceImpl;

ClientRepositoryImpl as jest.Mock<ClientRepositoryImpl>;

describe('ClientService', () => {  
  beforeAll(() => {
    clientService = new ClientServiceImpl(fakeClientRepository);
  });

  beforeEach(() => {
    fakeClientRepository.findAll.mockReset();
  });

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
      fakeClientRepository.findAll.mockResolvedValueOnce([client1, client2]);
            
      const clientList = await clientService.findAll();

      expect(clientList).toHaveLength(2);
      expect(fakeClientRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});