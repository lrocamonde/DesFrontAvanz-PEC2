import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';

export const login = createAction(
    '[AUTH] Log User',
    props<{user: AuthDTO}>()
)