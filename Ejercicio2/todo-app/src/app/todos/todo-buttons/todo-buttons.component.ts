import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { completeAllTodos, deleteCompleteTodos } from '../actions/todo.actions';

@Component({
  selector: 'app-todo-buttons',
  templateUrl: './todo-buttons.component.html',
  styleUrls: ['./todo-buttons.component.scss']
})
export class TodoButtonsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  completeAllTasks(): void {
    this.store.dispatch(completeAllTodos());
  }

  deleteCompleteTasks(): void {
    this.store.dispatch(deleteCompleteTodos());
  }
}
