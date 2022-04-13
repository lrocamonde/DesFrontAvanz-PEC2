import { AuthDTO } from "../models/auth.dto";
import { Action, createReducer, on } from "@ngrx/store";
import { login, loginError, loginSuccess } from "../actions";

export interface AuthState {
    auth: AuthDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
}

export const initialState: AuthState = {
    auth: new AuthDTO('', '', '', ''),
    loading: false,
    loaded: false,
    error: null
}

const _authReducer = createReducer(
    initialState,
    on(login, (state) => ({...state, loading: true })),
    on(loginSuccess, (state, {user_id, access_token}) => ({
        ...state,
        loading: false,
        loaded: true,
        auth: new AuthDTO(user_id, access_token, '', ''),
        error: null
    })),
    on(loginError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload,
        auth: initialState.auth
    }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}