import { ActionReducerMap } from "@ngrx/store";
import { TodoDTO } from "./todos/models/todo.dto";

import * as reducers from './todos/reducers';

export interface AppState {
    todosApp: reducers.TodoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    todosApp: reducers.todoReducer
};