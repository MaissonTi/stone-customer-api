import { Redis } from 'ioredis';
import { ICacheService } from '@src/domain/protocols/cache/cache.service.interface';
import { CacheUnavailableError } from '@src/domain/protocols/errors/cache-unavailable.error';
import { RedisKeysPrefix } from '../redis.keys.enum';
export class CacheService implements ICacheService {
  constructor(readonly client: Redis) {}

  async set(key: string, value: string): Promise<string> {
    try {
      return this.client.set(key, value);
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }

  async get(key: string): Promise<string> {
    try {
      return this.client.get(key);
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }

  async all(): Promise<Array<string>> {
    try {
      return this.client.keys('*');
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }

  async hasKey(key: string): Promise<boolean> {
    try {
      const keys = await this.all();
      return keys.includes(`${RedisKeysPrefix.CUSTOMER}${key}`);
    } catch (error) {
      throw new CacheUnavailableError();
    }
  }
}
