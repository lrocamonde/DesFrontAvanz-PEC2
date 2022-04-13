import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { getUserById, getUserByIdSuccess, register, registerError, registerSuccess, updateUser, updateUserError, updateUserSuccess } from "../actions";
import { UserService } from "../services/user.service";

@Injectable()
export class UserEffects {
    constructor(
        private action$: Actions,
        private userService: UserService
    ) {}

    registerUser$ = createEffect(() => 
        this.action$.pipe(
            ofType(register),
            mergeMap((user) => 
                this.userService.register(user.user).pipe(
                    map((user) => registerSuccess({user: user})),
                    catchError((err) => of(registerError({payload: err})))
                )
            )
        )
    );

    updateUser$ = createEffect(() => 
        this.action$.pipe(
            ofType(updateUser),
            mergeMap((user) => 
                this.userService.updateUser(user.userId, user.user).pipe(
                    map((user) => updateUserSuccess({user: user})),
                    catchError((err) => of(updateUserError({payload: err})))
                )
            )
        )
    );

    getUserById$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUserById),
            mergeMap((userId) =>
                this.userService.getUSerById(userId.userId).pipe(
                    map((user) => getUserByIdSuccess({user: user}))
                )
            )
        )
    );
}