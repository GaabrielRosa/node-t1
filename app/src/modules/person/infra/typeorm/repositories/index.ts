import { getDbConnection } from '@shared/infra/typeorm';
import { Person } from '../entities/Person';

export const getRepositoryPerson = getDbConnection.getRepository(Person);
