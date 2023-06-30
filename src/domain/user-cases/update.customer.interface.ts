import { Customer as CustomerModel } from '../models/customer';

export interface IUpdateCustomer {
  execute: (id: string, data: IUpdateCustomer.Customer) => Promise<CustomerModel>;
}

export namespace IUpdateCustomer {
  export type Customer = Omit<CustomerModel, 'id'>;
}
