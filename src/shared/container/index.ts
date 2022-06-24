import { Container, ContainerModule, interfaces } from 'inversify';

import { bindingsPerson } from '@modules/person/container';
import { EnsureAuthenticated } from '@shared/infra/http/middlewares/EnsureAuthenticated';
import { TYPES } from './types';
import { bindingsUser } from '@modules/user/container';
import CacheProvider from '@shared/providers/CacheProvider/models/CacheProvider';
import RedisCacheProvider from '@shared/providers/CacheProvider/implementations/RedisCacheProvider';

const containerShared = new ContainerModule((bind: interfaces.Bind) => {
  bind<EnsureAuthenticated>(TYPES.EnsureAuthenticated).to(EnsureAuthenticated);

  //providers
  bind<CacheProvider>(TYPES.CacheProvider).to(RedisCacheProvider);
});

const containerBindings = new Container();

containerBindings.load(
  containerShared,
  bindingsPerson,
  bindingsUser,
);

export { containerBindings };
