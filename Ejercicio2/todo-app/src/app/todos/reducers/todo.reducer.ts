import { Action, createReducer, on } from "@ngrx/store";
import { TodoDTO } from "../models/todo.dto";
import {completeAllTodos, completeTodo, createTodo, deleteCompleteTodos, deleteTodo, editTodo, getAllTodos, getAllTodosError, getAllTodosSuccess} from '../actions';
import { state } from "@angular/animations";

//export const initialState: TodoDTO[] = [];

export interface TodoState {
    todos: TodoDTO[];
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: TodoState = {
    todos: [new TodoDTO('Terminar practica 2')],
    loading: false,
    loaded: false,
    error: null
};

const _todoReducer = createReducer(
    initialState,
   // on(createTodo, (state, { title }) => [...state, new TodoDTO(title)]),
   on(createTodo, (state, { title }) => ({
    ...state,
    loading: false,
    loaded: false,
    todos: [...state.todos, new TodoDTO(title   )]
   })),

   on(completeTodo, (state, { id }) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [... state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    done: true
                };
            } else{
                return todo;
            } 
        })]
    })), 

    on(editTodo, (state, { id, title}) => ({
        ...state,
        loading: false,
        loaded: false,
        todos: [...state.todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                };
            } else{
                return todo;
            }
        })]
    })),

    on(deleteTodo, (state, { id }) => ({
        ...state, 
        loading: false, 
        loaded:false, 
        todos: [...state.todos.filter( todo => todo.id !== id)]
    })),
    on( getAllTodos, state => ({...state, loading: true})),

    on( getAllTodosSuccess, ( state, {todos}) => ({
        ...state,
        loading: false,
        loaded: true,
        todos: [ ...todos]
    })),

    on ( getAllTodosError, ( state, {payload}) => ({
        ...state,
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            status: payload.status,
            message: payload.message
        }
    })),

    on ( completeAllTodos, ( state ) =>({
        ...state,
        loading: false,
        loaded: false,
        todos: [... state.todos.map((todo) => {
            if (!todo.done) {
                return {
                    ...todo,
                    done: true
                };
            } else{
                return todo;
            } 
        })]
    })),

    on ( deleteCompleteTodos, ( state ) => ({
        ...state, 
        loading: false, 
        loaded:false, 
        todos: [...state.todos.filter( todo => todo.done !== true)]
    }))
);

export function todoReducer(state: TodoState | undefined, action: Action) {
    return _todoReducer(state, action);
}