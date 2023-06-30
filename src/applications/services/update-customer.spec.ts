import { instance, mock, verify, anything, when } from 'ts-mockito';
import { CacheService } from '@src/infra/redis/services/cache-service';
import { Customer } from '@src/domain/models/customer';
import { UpdateCustomer } from './update-customer';
import { FindCustomer } from './find-customer';

describe('UpdateCustomer Unit Tests', () => {
  let sut: UpdateCustomer;
  const redisService = mock(CacheService);
  const findCustomer = mock(FindCustomer);

  beforeEach(async () => {
    sut = new UpdateCustomer(instance(redisService), instance(findCustomer));
  });

  describe('execute', () => {
    const params = { id: anything() };

    it('Should update customer', async () => {
      const oldCustomerMock = {
        id: params.id,
        document: 1,
        name: anything(),
      } as Customer;

      const newCustomerMock = { name: 'new_value_name' } as Customer;

      when(findCustomer.execute(params.id)).thenResolve(oldCustomerMock);

      const result = await sut.execute(params.id, newCustomerMock);

      verify(findCustomer.execute(params.id)).once();
      expect(result.name).toEqual(newCustomerMock.name);
    });

    it('Should return NotFoundException', async () => {
      const params = { id: anything() };
      const newCustomerMock = { name: 'new_value_name' } as Customer;

      when(findCustomer.execute(params.id)).thenResolve(undefined);

      try {
        await sut.execute(params.id, newCustomerMock);
      } catch (error) {
        expect(error.name).toEqual('NotFoundException');
      }
    });
  });
});
