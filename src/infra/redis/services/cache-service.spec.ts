import { instance, mock, verify, when, anything } from 'ts-mockito';

import { Redis } from 'ioredis';
import { CacheService } from './cache-service';

describe('RedisService Unit Tests', () => {
  let sut: CacheService;
  const redisMock = mock(Redis);

  beforeEach(async () => {
    sut = new CacheService(instance(redisMock));
  });

  describe('set', () => {
    it('should set anything value in cache', async () => {
      const key = anything();
      const value = anything();

      await sut.set(key, value);

      verify(redisMock.set(key, value)).times(1);
      verify(redisMock.set(key, value)).once();
    });
  });

  describe('get', () => {
    it('should return value "teste"', async () => {
      const key = anything();
      const value = 'teste';

      when(redisMock.get(key)).thenResolve(value);

      const result = await sut.get(key);

      verify(redisMock.get(key)).times(1);
      verify(redisMock.get(key)).once();
      expect(result).toBe(value);
    });
  });
});
