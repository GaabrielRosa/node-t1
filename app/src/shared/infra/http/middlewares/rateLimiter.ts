import { Request, Response, NextFunction } from 'express';
import Redis, { Redis as RedisClient } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient: RedisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

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
    res.status(429).json({
      status: 'error',
      message: 'Too many request'
    }).send();
  }
}
