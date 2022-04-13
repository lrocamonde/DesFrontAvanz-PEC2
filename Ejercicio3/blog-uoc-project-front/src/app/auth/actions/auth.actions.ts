import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';

export const login = createAction(
    '[AUTH] Log User',
    props<{auth: AuthDTO}>()
);

export const loginSuccess = createAction(
    '[Auth] Log succeeded',
    props<{user_id: string, access_token: string}>()
);

export const loginError = createAction(
    '[Auth] Log error',
    props<{payload: any}>()
);