import { injectable } from 'inversify';
import { Repository } from 'typeorm';

import { UserDTO } from '@modules/user/models/User';
import { UserRepository } from '@modules/user/repositories/UserRepository';
import { getRepositoryUser } from '.';
import { User } from '../entities/User';

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepositoryUser;
  }

  async findByEmail(email: string): Promise<UserDTO | null> {
    return this.repository.findOne({
      where: {
        email,
      }
    });
  }
}