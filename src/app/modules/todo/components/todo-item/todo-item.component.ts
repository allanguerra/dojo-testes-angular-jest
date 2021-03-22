import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/modules/todo/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  public todo: Todo;

  @Output()
  public edit: EventEmitter<Todo> = new EventEmitter();
  @Output()
  public delete: EventEmitter<Todo> = new EventEmitter();
  @Output()
  public toggleDone: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public actionEdit(): void {
    this.edit.emit(this.todo);
  }

  public actionDelete(): void {
    this.delete.emit(this.todo);
  }

  public actionToggleDone(): void {
    this.toggleDone.emit(this.todo);
  }

}
