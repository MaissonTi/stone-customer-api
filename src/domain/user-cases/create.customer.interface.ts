import { Customer as CustomerModel } from '../models/customer';

export interface ICreateCustomer {
  execute: (data: ICreateCustomer.Customer) => Promise<CustomerModel>;
}

export namespace ICreateCustomer {
  export type Customer = Omit<CustomerModel, 'id'>;
}
