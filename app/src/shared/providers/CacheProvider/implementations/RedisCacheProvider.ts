import Redis, { Redis as RedisClient } from 'ioredis';
import { injectable } from 'inversify';

import CacheProvider from '../models/CacheProvider';

@injectable()
class RedisCacheProvider implements CacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    });
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}

export default RedisCacheProvider;
