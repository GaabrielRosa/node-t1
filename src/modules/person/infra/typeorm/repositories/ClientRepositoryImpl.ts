import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { ClientDTO } from '@modules/person/models/Client';
import { ClientRepository } from '@modules/person/repositories/ClientRepository';
import { getRepositoryClient } from '.';
import { Client } from '../entities/Client';

@injectable()
class ClientRepositoryImpl implements ClientRepository {
  private repository: Repository<Client>

  constructor() {
    this.repository = getRepositoryClient;
  }

  async findAll(): Promise<ClientDTO[]> {
    return this.repository.find();
  }

}

export { ClientRepositoryImpl }
