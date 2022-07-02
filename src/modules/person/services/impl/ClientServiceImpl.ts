import { Client } from '@modules/person/models/Client';
import { ClientRepository } from '@modules/person/repositories/ClientRepository';
import { TYPES } from '@shared/container/types';
import CacheProvider from '@shared/providers/CacheProvider/models/CacheProvider';
import { inject, injectable } from 'inversify';
import { ClientService } from '../ClientService';

@injectable()
class ClientServiceImpl implements ClientService {

  constructor(
    @inject(TYPES.ClientRepository)
    private clientRepository: ClientRepository,

    @inject(TYPES.CacheProvider)
    private cacheProvider: CacheProvider,
  ) {}

  async findAll(): Promise<Client[]> {
    let clientList = await this.cacheProvider.recover<Client[]>('clients-list');
    
    if (!clientList) {
      const clientListData = await this.clientRepository.findAll();
      clientList = clientListData.map(dto => dto as Client)

      await this.cacheProvider.save('clients-list', clientList);
    }

    return clientList;
  }

}

export { ClientServiceImpl }