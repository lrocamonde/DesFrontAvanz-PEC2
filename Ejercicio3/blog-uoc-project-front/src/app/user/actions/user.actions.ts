import { createAction, props } from '@ngrx/store';
import { UserDTO } from '../models/user.dto';

export const register = createAction(
    '[USER] Register new User',
    props<{ user: UserDTO }>()
);

export const registerSuccess = createAction(
    '[USER] Register succeeded',
    props<{ user: UserDTO }>()
);

export const registerError = createAction(
    '[USER] Register with errors',
    props<{ payload: any }>()
);

export const getUserById = createAction(
    '[USER] Get user by Id',
    props<{ userId: string }>()
);

export const getUserByIdSuccess = createAction(
    '[USER] Get user by Id succeeded',
    props<{ user: UserDTO }>()
);

export const getUserByIdError = createAction(
    '[USER] Get user by Id failed',
    props<{ payload: any }>()
);

export const updateUser = createAction(
    '[USER] User update',
    props<{ userId: string, user: UserDTO }>()
);

export const updateUserSuccess = createAction(
    '[USER] User update succeeded',
    props<{ user: UserDTO }>()
);

export const updateUserError = createAction(
    '[USER] User update with errors',
    props<{ payload: any }>()
);