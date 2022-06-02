import { Container, ContainerModule, interfaces } from 'inversify';

import { bindingsPerson } from '@modules/person/container';
import { EnsureAuthenticated } from '@shared/infra/http/middlewares/EnsureAuthenticated';
import { TYPES } from './types';
import { bindingsUser } from '@modules/user/container';

const containerShared = new ContainerModule((bind: interfaces.Bind) => {
  bind<EnsureAuthenticated>(TYPES.EnsureAuthenticated).to(EnsureAuthenticated);
});

const containerBindings = new Container();

containerBindings.load(
  containerShared,
  bindingsPerson,
  bindingsUser,
);

export { containerBindings };
