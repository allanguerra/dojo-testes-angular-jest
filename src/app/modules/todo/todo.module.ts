import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodoItemComponent } from './components/todo-item/todo-item.component';


@NgModule({
  declarations: [TodoListComponent, TodoFormComponent, TodoItemComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }
