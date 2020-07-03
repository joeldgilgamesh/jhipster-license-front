export interface IActivationkey {
  id?: number;
  username?: string;
  keyactivation?: string;
  productname?: string;
  nbreposte?: number;
  nbreinstanceon?: number;
}

export class Activationkey implements IActivationkey {
  constructor(
    public id?: number,
    public username?: string,
    public keyactivation?: string,
    public productname?: string,
    public nbreposte?: number,
    public nbreinstanceon?: number
  ) {}
}
