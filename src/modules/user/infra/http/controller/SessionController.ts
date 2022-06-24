import { inject } from 'inversify';
import { controller, httpPost, requestBody, response } from 'inversify-express-utils';
import { Response } from 'express';

import { TYPES } from '@shared/container/types';
import { SessionCredentialsDTO, SessionService } from '@modules/user/services/SessionService';

@controller('/auth')
export class SessionController {

  constructor(
    @inject(TYPES.SessionService)
    private sessionService: SessionService
  ) { }

  @httpPost('/')
  public async auth(@requestBody() credentials: SessionCredentialsDTO, @response() res: Response): Promise<Response> {
    return res.json(await this.sessionService.auth(credentials));
  }

}
