import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoFormComponent } from './todo-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';
import { Component } from '@angular/core';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  window.alert = jest.fn();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'todo-list', component: EmptyRouteComponent }])
      ],
      providers: [
        TodoService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { url: [{ path: 'new' }] }
          }
        }
      ],
      declarations: [ TodoFormComponent, EmptyRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 1. Descrição do teste (comportamento esperado - BDD)
  it('deve salvar uma nova tarefa ao clicar em Salvar', () => {
    // 2. Mock das fronteiras de saída
    const salvarSpy = jest.spyOn(TodoService.prototype, 'salvarNovaTarefa')
      .mockReturnValue( of( fixtureSavedTodo() ) );

    // 3. Estado inicial do teste
    component.ngOnInit(); // define a variavel acaoAtual
    fixture.detectChanges();

    component.todoForm.get('title').setValue('any_todo_title');
    component.todoForm.get('description').setValue('any_todo_description');
    fixture.detectChanges();

    // 4. Executa o método a ser testado
    component.salvar();

    // 5. Verifica os resultados obtidos
    expect(salvarSpy).toHaveBeenCalledTimes(1);
    expect(salvarSpy).toHaveBeenCalledWith(
      { id: null, title: 'any_todo_title', description: 'any_todo_description', status: 'pending' }
    );
  });
});

function fixtureSavedTodo(): Todo {
  return {
    id: 1,
    title: 'any_todo_title',
    description: 'any_todo_description',
    status: TodoStatus.PENDENTE
  };
}

@Component({ template: ''})
class EmptyRouteComponent {}
