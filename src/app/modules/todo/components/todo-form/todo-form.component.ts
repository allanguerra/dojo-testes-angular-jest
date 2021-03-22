import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { TodoStatus } from 'src/app/modules/todo/enums/todo-status.enum';
import { Todo } from 'src/app/modules/todo/models/todo.model';
import { TodoService } from 'src/app/modules/todo/services/todo-service/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  public titulo: string = '';
  public todoForm: FormGroup;
  public salvando: boolean = false;
  public todo: Todo;

  private acaoAtual: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService
  ) { }

  ngOnInit() {
    this.acaoAtual = this.route.snapshot.url[0].path;

    this.montarTodoForm();
    this.carregarTodo();
    this.definirTitulo();
  }

  public acaoVoltar(): void {
    this.router.navigate(['todo-list']);
  }

  public temErro(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  public salvar(): void {
    this.salvando = true;
    if (this.acaoAtual === 'new') {
      this.novaTarefa();
    } else {
      this.atualizarTarefa();
    }
  }

  // PRIVATE METHODS

  private definirTitulo(): void {
    if (this.acaoAtual === 'new') {
      this.titulo = 'Nova Tarefa';
    } else {
      this.titulo = 'Editando Tarefa';
    }
  }

  private montarTodoForm(): void {
    this.todoForm = this.fb.group({
      id: [null],
      status: [null],
      title: [null, [Validators.required]],
      description: [null]
    });
  }

  private carregarTodo(): void {
    if (this.acaoAtual === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.todoService.obterTarefaPorId(+params.get('id')))
      ).subscribe((todo: Todo) => {
        this.todo = todo;
        this.todoForm.patchValue(todo);
      });
    }
  }

  private novaTarefa(): void {
    const novaTask: Todo = Object.assign(new Todo(), this.todoForm.value);
    novaTask.status = TodoStatus.PENDENTE;

    this.todoService.salvarNovaTarefa(novaTask).subscribe((_: Todo) => {
      this.salvando = false;
      this.todoForm.reset();
      alert('Tarefa criada com sucesso!');
      this.router.navigate(['todo-list']);
    }, (_) => {
      this.salvando = false;
      this.todoForm.reset();
      alert('Um erro aconteceu ao salvar a tarefa, tente novamente por favor!');
    });
  }

  private atualizarTarefa(): void {
    const todo = Object.assign(new Todo(), this.todoForm.value);

    this.todoService.editarTarefa(todo).subscribe((_: Todo) => {
      this.salvando = false;
      this.todoForm.reset();
      alert('Tarefa atualizada com sucesso!');
      this.router.navigate(['todo-list']);
    }, (_) => {
      this.salvando = false;
      this.todoForm.reset();
      alert('Um erro aconteceu ao editar a tarefa, tente novamente por favor!');
    });
  }

}
