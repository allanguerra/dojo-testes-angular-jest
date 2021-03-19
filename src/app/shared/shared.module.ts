import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';



@NgModule({
  declarations: [
    TodoTaskComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TodoTaskComponent
  ]
})
export class SharedModule { }
