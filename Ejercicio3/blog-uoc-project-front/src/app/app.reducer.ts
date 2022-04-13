import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './auth/reducers';
import * as userReducers from './user/reducers';
import * as categoryReducers from './category/reducers';

export interface AppState {
    authApp: authReducers.AuthState;
    userApp: userReducers.UserState;
    categoryApp: categoryReducers.CategoryState;
}

export const appReducers: ActionReducerMap<AppState> = {
    authApp: authReducers.authReducer,
    userApp: userReducers.userReducer,
    categoryApp: categoryReducers.categoryReducer
}