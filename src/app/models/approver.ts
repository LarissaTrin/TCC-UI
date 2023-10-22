export class Approver {
  constructor(id?: number, environment?: string, user?: string, order?: number) {
    this.id = id ? id : 0;
    this.environment = environment ? environment : '';
    this.user = user;
    this.order = order;
  }

  id: number;
  environment: string;
  user?: string;
  order?: number;
}