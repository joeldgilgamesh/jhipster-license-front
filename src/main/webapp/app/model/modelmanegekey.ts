import { User } from './user';
import { ProductService } from './product-service';

export class Modelmanegekey {
  constructor(
    public activationkey?: number,
    public username?: User,
    public keyactivation?: String,
    public productname?: ProductService,
    public nbrePoste?: number,
    public nbreinstanceOn?: number
  ) {}
}
