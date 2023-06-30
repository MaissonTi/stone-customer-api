import { instance, mock, verify, anything } from 'ts-mockito';
import { CreateCustomer } from './create-customer';
import { CacheService } from '@src/infra/redis/services/cache-service';

describe('CreateCustomer Unit Tests', () => {
  let sut: CreateCustomer;
  const cacheService = mock(CacheService);

  beforeEach(async () => {
    sut = new CreateCustomer(instance(cacheService));
  });

  describe('execute', () => {
    it('should add some value in cache with uuid', async () => {
      const customer = anything();

      const result = await sut.execute(customer);

      verify(cacheService.set(result.id, JSON.stringify(result))).once();
      expect(result.id).toBeTruthy();
    });
  });
});
