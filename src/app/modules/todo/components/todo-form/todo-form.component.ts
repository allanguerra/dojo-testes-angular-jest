import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  private acaoAtual: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly todoService: TodoService
  ) { }

  ngOnInit() {
    this.acaoAtual = this.route.snapshot.url[0].path;

    this.definirTitulo();
    this.montarTodoForm();
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
      title: [null, [Validators.required]],
      description: [null]
    });
  }

  private novaTarefa(): void {
    const novaTask: Todo = Object.assign(new Todo(), this.todoForm.value);
    novaTask.status = TodoStatus.PENDENTE;

    this.todoService.salvarNovaTarefa(novaTask).subscribe((todo: Todo) => {
      this.salvando = false;
      this.todoForm.reset();
      console.log(`SUCCESS: ${todo}`);
    }, (erro) => {
      this.salvando = false;
      this.todoForm.reset();
      console.log(`ERROR: ${erro}`);
    });
  }

  private atualizarTarefa(): void {}

}
