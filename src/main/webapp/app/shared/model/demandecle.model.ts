export interface IDemandecle {
  id?: number;
  nbreposte?: number;
  dureecle?: number;
  productname?: string;
}

export class Demandecle implements IDemandecle {
  constructor(public id?: number, public nbreposte?: number, public dureecle?: number, public productname?: string) {}
}
