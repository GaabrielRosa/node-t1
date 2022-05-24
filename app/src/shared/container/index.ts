import { Container } from 'inversify';

import { bindingsPerson } from '@modules/person/container';

const containerBindings = new Container();

containerBindings.load(
  bindingsPerson,
);

export { containerBindings };
