import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { BaseMiddleware } from 'inversify-express-utils';

import authConfig from '@modules/user/config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export class EnsureAuthenticated extends BaseMiddleware {
  
  public handler(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('JWT token não informado', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      const { sub } = decoded as TokenPayload;

      req.userId = sub;

      return next();
    } catch {
      throw new AppError('JWT token inválido', 401);
    }
  }

}
