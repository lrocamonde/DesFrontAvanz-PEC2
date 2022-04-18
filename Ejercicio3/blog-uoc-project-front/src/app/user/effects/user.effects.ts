import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, finalize, map, mergeMap, of } from "rxjs";
import { SharedService } from "src/app/shared/services/shared.service";
import { getUserById, getUserByIdError, getUserByIdSuccess, register, registerError, registerSuccess, updateUser, updateUserError, updateUserSuccess } from "../actions";
import { UserService } from "../services/user.service";

@Injectable()
export class UserEffects {
    responseOK: boolean = false;
    errorResponse: any;

    constructor(
        private action$: Actions,
        private userService: UserService,
        private sharedService: SharedService,
        private router: Router
    ) {}

    registerUser$ = createEffect(() => 
        this.action$.pipe(
            ofType(register),
            mergeMap((params) => 
                this.userService.register(params.user).pipe(
                    map((user) => registerSuccess({user: user})),
                    catchError((err) => of(registerError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                          'userFeedback',
                          this.responseOK,
                          this.errorResponse
                        );
              
                        if (this.responseOK) {
                          this.router.navigateByUrl('home');
                        }
                      })
                )
            )
        )
    );

    registerSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(registerSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    registerError$ = createEffect(() =>
        this.action$.pipe(
            ofType(registerError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    updateUser$ = createEffect(() => 
        this.action$.pipe(
            ofType(updateUser),
            mergeMap((params) => 
                this.userService.updateUser(params.userId, params.user).pipe(
                    map((user) => updateUserSuccess({user: user})),
                    catchError((err) => of(updateUserError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                          'userFeedback',
                          this.responseOK,
                          this.errorResponse
                        );
                      })
                )
            )
        )
    );

    updateUserSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateUserSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    updateUserError$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateUserError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );


    getUserById$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUserById),
            mergeMap((params) =>
                this.userService.getUSerById(params.userId).pipe(
                    map((user) => getUserByIdSuccess({user: user})),
                    catchError((err) => of(getUserByIdError({payload: err})))
                )
            )
        )
    );

    getUserByIdSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUserByIdSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getUserByIdError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getUserByIdError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );
}