import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoFormComponent } from './todo-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';
import { ActivatedRoute } from '@angular/router';

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
            snapshot: { url: [{ path: 'any_path' }] }
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
});
