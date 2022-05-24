import { inject } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';
import { TYPES } from '@shared/container/types';
import { Response, Request } from 'express';

import { Person } from '@modules/person/models/Person';
import { PersonService } from '@modules/person/services/PersonService';

@controller('/person')
class PersonController {

  constructor(
    @inject(TYPES.PersonService)
    private personService: PersonService
  ) {}

  @httpGet('/')
  public async findAll(@response() res: Response): Promise<Response> {
    return res.json(await this.personService.findAll());
  }

}

export { PersonController };
