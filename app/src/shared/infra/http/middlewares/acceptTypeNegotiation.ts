import { Request, Response, NextFunction } from 'express';

export async function acceptTypeNegotiation(req: Request, res: Response, next: NextFunction): Promise<void>  {
  try {
    if (req.headers['accept'] !== '*/*' && req.headers['accept'] !== 'application/json') {
      throw new Error('Not Acceptable');
    }
      
    return next(); 
  } catch (err) {
    res.status(406).json({
      status: 'error',
      message: 'Not Acceptable'
    }).send();
  }
}
