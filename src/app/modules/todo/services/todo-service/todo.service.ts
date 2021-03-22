import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/modules/todo/models/todo.model';

import { api } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public salvarNovaTarefa(tarefa: Todo): Observable<Todo> {
    return this.http.post<Todo>(api.todo, tarefa);
  }

  public obterTarefas(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(api.todo);
  }
}
