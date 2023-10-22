export class Tasks {
  constructor(id?: number, taskName?: string, userId?: number, date?: Date, completed?: boolean, cardId?: number,  order?: number) {
    this.id = id ? id : 0;
    this.taskName = taskName? taskName : '';
    this.userId = userId;
    this.date = date;
    this.completed = completed !== undefined ? completed : false;
    this.order = order;
    this.cardId = cardId ? cardId : 0;
  }

  id: number;
  taskName?: string;
  userId?: number;
  date?: Date;
  completed: boolean;
  cardId: number;
  order?: number;
}
