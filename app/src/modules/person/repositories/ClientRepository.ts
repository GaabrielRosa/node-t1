import { ClientDTO } from '../models/Client';

export interface ClientRepository {
  findAll(): Promise<ClientDTO[]>;
}
