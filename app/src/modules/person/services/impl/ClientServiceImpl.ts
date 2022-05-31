import { Client } from '@modules/person/models/Client';
import { ClientRepository } from '@modules/person/repositories/ClientRepository';
import { TYPES } from '@shared/container/types';
import { inject, injectable } from 'inversify';
import { ClientService } from '../ClientService';

@injectable()
class ClientServiceImpl implements ClientService {

  constructor(
    @inject(TYPES.ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  async findAll(): Promise<Client[]> {
    const clientList = await this.clientRepository.findAll();
    return clientList.map(dto => dto as Client);
  }

}

export { ClientServiceImpl }