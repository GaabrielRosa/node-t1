import { TYPES } from '@shared/container/types';

import { ContainerModule, interfaces } from 'inversify';
import { UserRepositoryImpl } from '../infra/typeorm/repositories/UserRepositoryImpl';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import HashProvider from '../providers/HashProvider/models/HashProvider';
import { UserRepository } from '../repositories/UserRepository';
import { SessionServiceImpl } from '../services/impl/SessionServiceImpl';
import { UserServiceImpl } from '../services/impl/UserServiceImpl';
import { SessionService } from '../services/SessionService';
import { UserService } from '../services/UserService';

const bindingsUser = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
  bind<UserService>(TYPES.UserService).to(UserServiceImpl);

  require('@modules/user/infra/http/controller/SessionController');
  bind<SessionService>(TYPES.SessionService).to(SessionServiceImpl);

  //providers
  bind<HashProvider>(TYPES.HashProvider).to(BCryptHashProvider);
});

export { bindingsUser };
