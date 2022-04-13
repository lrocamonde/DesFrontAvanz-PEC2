import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './auth/reducers';
import * as userReducers from './user/reducers';

export interface AppState {
    authApp: authReducers.AuthState;
    userApp: userReducers.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    authApp: authReducers.authReducer,
    userApp: userReducers.userReducer
}