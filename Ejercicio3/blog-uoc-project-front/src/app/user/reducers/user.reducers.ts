import { Action, createReducer, on } from "@ngrx/store";
import { register, registerError, registerSuccess, updateUser, updateUserError, updateUserSuccess, getUserById, getUserByIdSuccess, getUserByIdError } from "../actions";
import { UserDTO } from "../models/user.dto";

export interface UserState {
    user: UserDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: UserState = {
    user: new UserDTO('', '', '', '', new Date(), '', ''),
    loading: false,
    loaded: false,
    error: null
}

const _userReducer = createReducer (
    initialState,
    on(register, (state) => ({
        ...state, 
        loading: true,
        loaded: false,
        error: null
    })),
    on(registerSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: user,
        error: null
    })),
    on(registerError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(updateUser, (state) => ({
        ...state, 
        loading: true,
        loaded: false,
        error: null
    })),
    on(updateUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: user,
        error: null
    })),
    on(updateUserError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(getUserById, (state) => ({
        ...state, 
        loading: true,
        loaded: false,
        error: null
    })),
    on(getUserByIdSuccess, (state, {user}) => ({
        ...state,
        loading: false,
        loaded: true,
        user: user
    })),
    on(getUserByIdError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    }))
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}