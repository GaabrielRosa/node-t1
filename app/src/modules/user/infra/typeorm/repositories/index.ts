import { getDbConnection } from '@shared/infra/typeorm';
import { User } from '../entities/User';

export const getRepositoryUser = getDbConnection.getRepository(User);
