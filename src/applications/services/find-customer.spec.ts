import { instance, mock, verify, anything, when } from 'ts-mockito';
import { CacheService } from '@src/infra/redis/services/cache-service';
import { FindCustomer } from './find-customer';
import { Customer } from '@src/domain/models/customer';

describe('FindCustomer Unit Tests', () => {
  let sut: FindCustomer;
  const cacheService = mock(CacheService);

  beforeEach(async () => {
    sut = new FindCustomer(instance(cacheService));
  });

  describe('execute', () => {
    const params = { id: anything() };

    it('Should get a customer', async () => {
      const customerMock = {
        id: params.id,
        document: anything(),
        name: anything(),
      } as Customer;

      when(cacheService.get(params.id)).thenResolve(JSON.stringify(customerMock));

      const result = await sut.execute(params);

      verify(cacheService.get(params.id)).once();
      expect(result.id).toEqual(params.id);
    });

    it('should return NotFoundException', async () => {
      const params = { id: anything() };

      when(cacheService.get(params.id)).thenResolve(undefined);

      try {
        await sut.execute(params);
      } catch (error) {
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
});
