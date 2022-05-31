import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import { initializeDbConnection } from '../typeorm';
import { InversifyExpressServer } from 'inversify-express-utils';
import AppError from '@shared/errors/AppError';
import { containerBindings } from '@shared/container';

(async () => {
  await initializeDbConnection();
  
  const server = new InversifyExpressServer(containerBindings);

  server.setConfig((app) => {
    app.use(express.urlencoded({
      extended: true
    }));
    app.use(express.json());
    //app.use(cors());
  });
  
  server.setErrorConfig(app => {    
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err);

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
  const app = server.build();

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})();