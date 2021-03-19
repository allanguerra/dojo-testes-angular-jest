import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';

export class Todo {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public status?: TodoStatus
  ) {}
}
