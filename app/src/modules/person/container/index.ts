import { TYPES } from '@shared/container/types';

import { ContainerModule, interfaces } from 'inversify';
import { PersonRepositoryImpl } from '../infra/typeorm/repositories/PersonRepositoryImpl';
import { PersonRepository } from '../repositories/PersonRepository';
import { PersonServiceImpl } from '../services/impl/PersonServiceImpl';
import { PersonService } from '../services/PersonService';

const bindingsPerson = new ContainerModule((bind: interfaces.Bind) => {
  require('@modules/person/infra/http/controller/PersonController');
  bind<PersonRepository>(TYPES.PersonRepository).to(PersonRepositoryImpl);
  bind<PersonService>(TYPES.PersonService).to(PersonServiceImpl);
});

export { bindingsPerson };
