import { Client } from '../models/Client';

export interface ClientService  {
  findAll(): Promise<Client[]>;
}
