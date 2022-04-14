import { ActionReducerMap } from '@ngrx/store';
import * as authReducers from './auth/reducers';
import * as userReducers from './user/reducers';
import * as categoryReducers from './category/reducers';
import * as postReducers from './post/reducers'

export interface AppState {
    authApp: authReducers.AuthState;
    userApp: userReducers.UserState;
    categoryApp: categoryReducers.CategoryState;
    postApp: postReducers.PostState;
}

export const appReducers: ActionReducerMap<AppState> = {
    authApp: authReducers.authReducer,
    userApp: userReducers.userReducer,
    categoryApp: categoryReducers.categoryReducer,
    postApp: postReducers.postReducer
}