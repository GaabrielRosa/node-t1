import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import logger from 'pino';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger.json';

import { InversifyExpressServer } from 'inversify-express-utils';
import AppError from '@shared/errors/AppError';
import { containerBindings } from '@shared/container';
import { rateLimiter } from './middlewares/rateLimiter';
import { contentTypeNegotiation } from './middlewares/contentTypeNegotiation';
import { acceptTypeNegotiation } from './middlewares/acceptTypeNegotiation';

const server = new InversifyExpressServer(containerBindings);

server.setConfig((app) => {
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(rateLimiter);
  app.use(contentTypeNegotiation);
  app.use(acceptTypeNegotiation);
  app.use(cors({
    optionsSuccessStatus: 200,
  }));
});

server.setErrorConfig(app => {    
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger().info(err);

    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  });
}); 

export const serverApp = server.build();
