import { Inject } from '@nestjs/common';
import { Customer } from '@src/domain/models/customer';
import { ICacheService } from '@src/domain/protocols/cache/cache.service.interface';
import { ICreateCustomer } from '@src/domain/user-cases/create.customer.interface';
import { v4 as uuidv4 } from 'uuid';

export class CreateCustomer implements ICreateCustomer {
  constructor(
    @Inject('CacheService')
    private readonly cacheService: ICacheService,
  ) {}

  public async execute(customer: ICreateCustomer.Customer): Promise<Customer> {
    const uuid = uuidv4();

    const payload = {
      id: uuid,
      ...customer,
    };

    await this.cacheService.set(payload.id, JSON.stringify(payload));

    return payload;
  }
}
