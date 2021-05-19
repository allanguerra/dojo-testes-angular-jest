import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoFormComponent } from './todo-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';
import { of } from 'rxjs';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
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
      declarations: [ TodoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 1. descricao do teste
  it('deve desabilitar o botao salvar quando o form estiver invalido', () => {
    // 2. fazendo mocks necessarios
    const serviceSpy = jest.spyOn(TodoService.prototype, 'salvarNovaTarefa')
      .mockReturnValueOnce( of(fixtureTarefaSalva()) );

    // 3. montando estrutura inicial do teste
    component.ngOnInit();
    fixture.detectChanges();

    component.salvando = false;
    component.todoForm.get('title').setValue(null);
    fixture.detectChanges();

    // 4. executando cenario
    const botaoSalvar: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#botaoSalvar');
    botaoSalvar.click();
    fixture.detectChanges();

    // 5. verificando
    expect(serviceSpy).not.toHaveBeenCalled();
  });
});

function fixtureTarefaSalva(): Todo {
  return {
    id: 1,
    title: 'any_title',
    description: 'any_description',
    status: TodoStatus.PENDENTE
  };
}
