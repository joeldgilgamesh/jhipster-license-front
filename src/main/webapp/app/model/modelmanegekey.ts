import { ProductService } from './product-service';

export class Modelmanegekey {
  constructor(
    public id?: number,
    public keyactivation?: String,
    public nbreinstanceon?: number,
    public nbreposte?: number,
    public productname?: ProductService,
    public username?: string
  ) {}
}
