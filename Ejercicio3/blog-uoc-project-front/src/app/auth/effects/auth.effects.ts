import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { login, loginError, loginSuccess } from "../actions";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffects {

    constructor(
        private action$: Actions,
        private authService: AuthService
    ) {}

    getAuth$ = createEffect(() => 
        this.action$.pipe(
            ofType(login),
            mergeMap((params) => 
                this.authService.login(params.auth).pipe(
                    map((auth) => loginSuccess({user_id: auth.user_id, access_token: auth.access_token})),
                    catchError((err) => of(loginError({payload: err})))
                )
            )
        )
    );
}