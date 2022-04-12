import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, map, of } from "rxjs";
import { getAllTodos, getAllTodosError, getAllTodosSuccess } from "../actions";
import { TodoService } from "../services/todo.service";

@Injectable()
export class TodosEffects {

    constructor(
        private action$: Actions,
        private todosService: TodoService
    ) {}

    getTodos$ = createEffect(() => 
        this.action$.pipe(
            ofType(getAllTodos),
            mergeMap(() =>
                this.todosService.getAllTodos().pipe(
                    map((todos) => getAllTodosSuccess({ todos: todos})),
                    catchError((err) => of (getAllTodosError({ payload: err })))
                )
            )
        )
    );
}