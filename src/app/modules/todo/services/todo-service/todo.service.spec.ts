import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';
import { Todo } from 'src/app/modules/todo/models/todo.model';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.get(TodoService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Para este testes, vamos fazer um subscribe em um Observable, por isso precisamos
  // injetar o nosso test o done. Este objeto é responsavel por resolver todas requisições
  // assincronas que o nosso teste invoque.
  it('deve obter uma lista de tarefas', (done) => {
    service.obterTarefas().subscribe({
      next: (todos: Array<Todo>) => {
        expect(todos).toBeTruthy();
        expect(todos.length).toBe(2);
        expect(todos[0].title).toBe('any_title');
        expect(todos[1].title).toBe('any_title_2');
        expect(todos[0].status).toBe('done');
        expect(todos[1].status).toBe('pending');

        // no final do método subscribe chamamos o done.
        done();
      },
      // Podemos utilizar o done no cenário de erro do nosso subscribe para garantir
      // que não vamos ter um erro durante a execução e para isso utilizamos o done.fail(),
      // e caso o teste caia aqui ele irá falhar. (caso não utilizasemos o done.fail() aqui
      // por qualquer motivo o teste retornasse um erro, poderiamos ter um falso positivo)
      error: () => done.fail()
    });

    // O HttpTestingController precisa ser chamado no final do cenário de teste,
    // nessa ocasião a estrutura de um teste pode ser desrespeitada, devido a uma
    // particularidade do HttpTestingController.
    httpMock.expectOne('http://localhost:3000/todos')
      .flush(fixtureTodos(), { status: 200, statusText: 'ok' });
  });
});

function fixtureTodos(): Array<Todo> {
  return [
    {
      id: 1,
      title:  'any_title',
      description: 'any_description',
      status: TodoStatus.CONCLUIDA
    },
    {
      id: 2,
      title:  'any_title_2',
      description: 'any_description_2',
      status: TodoStatus.PENDENTE
    }
  ];
}
