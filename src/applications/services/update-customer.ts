import { Inject } from '@nestjs/common';
import { Customer } from '@src/domain/models/customer';
import { ICacheService } from '@src/domain/protocols/cache/cache.service.interface';
import { IFindCustomer } from '@src/domain/user-cases/find.customer.interface';
import { IUpdateCustomer } from '@src/domain/user-cases/update.customer.interface';

export class UpdateCustomer implements IUpdateCustomer {
  constructor(
    @Inject('CacheService')
    private readonly cacheService: ICacheService,

    @Inject('FindCustomer')
    private readonly findCustomer: IFindCustomer,
  ) {}

  public async execute(id: string, customer: IUpdateCustomer.Customer): Promise<Customer> {
    const customerOld = await this.findCustomer.execute({ id });

    const newCustomer = {
      ...customerOld,
      ...customer,
    } as Customer;

    await this.cacheService.set(id, JSON.stringify(newCustomer));

    return newCustomer;
  }
}
