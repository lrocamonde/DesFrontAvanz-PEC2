import { AuthDTO } from "../models/auth.dto";
import { Action, createReducer, on } from "@ngrx/store";
import { login } from "../actions";

export interface AuthState {
    auth: AuthDTO;
    error: any;
}

export const initialState: AuthState = {
    auth: new AuthDTO('', '', '', ''),
    error: null
}

const _authReducer = createReducer(
    initialState,
    on(login, (state, { user }) => ({
        ...state,
        auth: new AuthDTO(user.user_id, user.access_token, user.email, user.password)
    }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
    return _authReducer(state, action);
}