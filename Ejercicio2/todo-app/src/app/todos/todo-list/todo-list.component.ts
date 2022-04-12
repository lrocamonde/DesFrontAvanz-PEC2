import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllTodos } from '../actions';
import { TodoDTO } from '../models/todo.dto';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: TodoDTO[] = [];

  constructor(private store: Store<AppState>, private todoService: TodoService) { }

  ngOnInit(): void {
    this.store.select('todosApp').subscribe( todosResponse => {
      this.todos = todosResponse.todos;
    });

    this.store.dispatch(getAllTodos());
  }
}
