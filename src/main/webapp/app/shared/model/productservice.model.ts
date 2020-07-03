export interface IProductservice {
  id?: number;
  productname?: string;
  codeproduct?: string;
  version?: string;
}

export class Productservice implements IProductservice {
  constructor(public id?: number, public productname?: string, public codeproduct?: string, public version?: string) {}
}
