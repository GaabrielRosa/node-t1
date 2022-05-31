import { inject, injectable } from 'inversify';

import { User } from '@modules/user/models/User';
import { UserService } from '../UserService';
import { TYPES } from '@shared/container/types';
import { UserRepository } from '@modules/user/repositories/UserRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export class UserServiceImpl implements UserService {

  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    return user as User;
  }

}