import { Action, createReducer, on } from "@ngrx/store";
import { register, registerError, registerSuccess, updateUser, updateUserError, updateUserSuccess, getUserById, getUserByIdSuccess } from "../actions";
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
    on(register, (state) => ({...state, loading: true})),
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
        user: initialState.user,
        error: payload
    })),
    on(updateUser, (state) => ({...state, loading: true})),
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
    on(getUserById, (state, {userId}) => ({...state, loading: true})),
    on(getUserByIdSuccess, (state, {user}) => ({
        ...state,
        loading: false,
        loaded: true,
        user: user
    }))
);

export function userReducer(state: UserState | undefined, action: Action) {
    return _userReducer(state, action);
}