import { getDbConnection } from '@shared/infra/typeorm';
import { Client } from '../entities/Client';

export const getRepositoryClient = getDbConnection.getRepository(Client);
