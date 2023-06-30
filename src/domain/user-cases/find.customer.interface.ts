import { Customer } from '../models/customer';

export interface IFindCustomer {
  execute: (params: IFindCustomer.Params) => Promise<Customer>;
}

export namespace IFindCustomer {
  export type Params = {
    id: string;
  };
}
