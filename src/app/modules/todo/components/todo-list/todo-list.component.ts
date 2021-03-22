import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';
import { Todo } from 'src/app/modules/todo/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public tarefas: Array<Todo>;

  constructor(
    private readonly router: Router,
    private readonly todoService: TodoService
  ) { }

  ngOnInit() {
    this.obterTarefas();
  }

  public acaoNovaTarefa(): void {
    this.router.navigate(['new']);
  }

  // PRIVATE METHODS

  private obterTarefas(): void {
    this.todoService.obterTarefas().subscribe((tarefas: Array<Todo>) => {
      this.tarefas = tarefas;
    });
  }

}
