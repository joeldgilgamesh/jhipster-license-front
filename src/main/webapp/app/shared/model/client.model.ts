export interface IClient {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  phone?: number;
}

export class Client implements IClient {
  constructor(public id?: number, public username?: string, public email?: string, public password?: string, public phone?: number) {}
}
