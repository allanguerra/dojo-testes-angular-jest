import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  public acaoNovaTarefa(): void {
    this.router.navigate(['new']);
  }

}
