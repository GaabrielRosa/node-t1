import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { instanceToInstance } from 'class-transformer';

import { TYPES } from '@shared/container/types';
import { ResponseSessionDTO, SessionCredentialsDTO, SessionService } from '../SessionService';
import { UserService } from '../UserService';
import AppError from '@shared/errors/AppError';
import authConfig from '@modules/user/config/auth';
import HashProvider from '@modules/user/providers/HashProvider/models/HashProvider';

@injectable()
export class SessionServiceImpl implements SessionService {

  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,

    @inject(TYPES.HashProvider)
    private hashProvider: HashProvider,
  ) {}

  async auth(credentials: SessionCredentialsDTO): Promise<ResponseSessionDTO> {
    const user = await this.userService.findByEmail(credentials.email);

    const passwordMatched = await this.hashProvider.compareHash(credentials.password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id, expiresIn });

    return { user: instanceToInstance(user), token };
  }
}