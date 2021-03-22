import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public tarefas: Array<Todo>;

  private statusOrder = {[TodoStatus.PENDENTE]: 1 , [TodoStatus.CONCLUIDA] : 2};

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

  public editTodo(todo: Todo): void {
    this.router.navigate(['edit', todo.id]);
  }

  public deleteTodo(todo: Todo): void {
    const confirmado = confirm(`Deseja excluir a tarefa: ${todo.title}?`);
    if (confirmado) {
      this.todoService.deletarTraefa(todo.id).subscribe(() => {
        this.obterTarefas();
      });
    }
  }

  public toggleDone(todo: Todo): void {
    if (todo.status === TodoStatus.PENDENTE) {
      todo.status = TodoStatus.CONCLUIDA;
    } else {
      todo.status = TodoStatus.PENDENTE;
    }

    this.todoService.editarTarefa(todo).subscribe((_: Todo) => {
      this.obterTarefas();
    });
  }

  // PRIVATE METHODS

  private obterTarefas(): void {
    this.todoService.obterTarefas().subscribe((tarefas: Array<Todo>) => {
      this.tarefas = tarefas.sort((a, b) => this.statusOrder[a.status] - this.statusOrder[b.status]);
    });
  }

}
