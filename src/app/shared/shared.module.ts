import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoTaskComponent } from './components/todo-task/todo-task.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodoTaskComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    // MODULES
    ReactiveFormsModule,
    // COMPONENTS
    TodoTaskComponent
  ]
})
export class SharedModule { }
