import logger from 'pino';
import { redisConnection } from '@shared/infra/redis';
import { Request, Response, NextFunction } from 'express';
import { Redis as RedisClient } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient: RedisClient = redisConnection;

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void>  {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    logger().info(err);

    res.status(429).json({
      status: 'error',
      message: 'Too many request'
    }).send();
  }
}
