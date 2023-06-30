import { NotFoundException, Inject } from '@nestjs/common';
import { Customer } from '@src/domain/models/customer';
import { ICacheService } from '@src/domain/protocols/cache/cache.service.interface';
import { IFindCustomer } from '@src/domain/user-cases/find.customer.interface';

export class FindCustomer implements IFindCustomer {
  constructor(
    @Inject('CacheService')
    private readonly cacheService: ICacheService,
  ) {}

  public async execute({ id }: IFindCustomer.Params): Promise<Customer> {
    const customer = await this.cacheService.get(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return JSON.parse(customer) as Customer;
  }
}
