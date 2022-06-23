import { Request, Response, NextFunction } from 'express';

export async function contentTypeNegotiation(req: Request, res: Response, next: NextFunction): Promise<void>  {
  try {
    if (req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
      throw new Error('Unsupported Media Type');
    }

    return next();
  } catch (error) {
    res.status(415).json({
      status: 'error',
      message: 'Unsupported Media Type'
    }).send();  
  }
}
