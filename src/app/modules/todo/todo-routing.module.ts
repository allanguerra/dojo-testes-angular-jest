import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoFormComponent } from 'src/app/modules/todo/components/todo-form/todo-form.component';
import { TodoListComponent } from 'src/app/modules/todo/components/todo-list/todo-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'new',
    component: TodoFormComponent
  },
  {
    path: 'edit/:id',
    component: TodoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
