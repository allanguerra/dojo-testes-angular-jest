import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TodoItemComponent } from 'src/app/modules/todo/components/todo-item/todo-item.component';
import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [ TodoService ],
      declarations: [ TodoListComponent, TodoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir uma lista de tarefas ao iniciar', () => {
    const spyListarTarefas = jest.spyOn(TodoService.prototype, 'obterTarefas')
      .mockReturnValue( of(fixtureTodoList()) );

    component.ngOnInit();
    fixture.detectChanges();

    const todoTitles = fixture.debugElement.nativeElement.querySelectorAll('.todo-item_content-info-title');

    expect(spyListarTarefas).toHaveBeenCalledTimes(1);
    expect(todoTitles.length).toBe(2);
    expect(todoTitles[0].textContent).toEqual('any_title_2');
  });
});

function fixtureTodoList(): Array<Todo> {
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
