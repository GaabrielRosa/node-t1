import { inject } from 'inversify';
import { controller, httpGet, response } from 'inversify-express-utils';
import { TYPES } from '@shared/container/types';
import { Response } from 'express';

import { ClientService } from '@modules/person/services/ClientService';

@controller('/client', TYPES.EnsureAuthenticated)
class ClientController {

  constructor(
    @inject(TYPES.ClientService)
    private clientService: ClientService
  ) {}

  @httpGet('/')
  public async findAll(@response() res: Response): Promise<Response> {
    return res.json(await this.clientService.findAll());
  }

}

export { ClientController };
