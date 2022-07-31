import 'dotenv/config';
import Redis from 'ioredis';

const redisConnection = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

export { redisConnection };