import { TYPES } from '@shared/container/types';

import { ContainerModule, interfaces } from 'inversify';
import { ClientRepositoryImpl } from '../infra/typeorm/repositories/ClientRepositoryImpl';
import { ClientRepository } from '../repositories/ClientRepository';
import { ClientService } from '../services/ClientService';
import { ClientServiceImpl } from '../services/impl/ClientServiceImpl';

const bindingsPerson = new ContainerModule((bind: interfaces.Bind) => {
  require('@modules/person/infra/http/controller/ClientController');
  bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepositoryImpl);
  bind<ClientService>(TYPES.ClientService).to(ClientServiceImpl);
});

export { bindingsPerson };
