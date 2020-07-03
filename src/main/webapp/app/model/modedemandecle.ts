import { User } from './user';
import { ProductService } from './product-service';

export class Modedemandecle {
  constructor(
    public nbreposte?: number,
    public dureecle?: number,
    public iduser?: User,
    public idproduct?: ProductService,
    public product_name?: ProductService
  ) {}
}
