import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, finalize, map, mergeMap, of } from "rxjs";
import { HeaderMenus } from "src/app/shared/models/header-menus.dto";
import { HeaderMenusService } from "src/app/shared/services/header-menus.service";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { login, loginError, loginSuccess } from "../actions";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthEffects {

  responseOK: boolean = false;
  errorResponse: any;

  constructor(
      private action$: Actions,
      private authService: AuthService,
      private headerMenusService: HeaderMenusService,
      private sharedService: SharedService,
      private localStorageService: LocalStorageService,
      private router: Router
  ) {}

  getAuth$ = createEffect(() => 
      this.action$.pipe(
          ofType(login),
          mergeMap((params) => 
              this.authService.login(params.auth).pipe(
                  map((auth) => loginSuccess({user_id: auth.user_id, access_token: auth.access_token})),
                  catchError((err) => of(loginError({payload: err}))),
                  finalize(async () => {
                    await this.sharedService.managementToast(
                      'categoriesFeedback',
                      this.responseOK,
                      this.errorResponse
                    );
          
                    if (this.responseOK) {
                      const headerInfo: HeaderMenus = {
                        showAuthSection: true,
                        showNoAuthSection: false,
                      };
                      // update options menu
                      this.headerMenusService.headerManagement.next(headerInfo);
                      this.router.navigateByUrl('home');
                    }
                })
              )
          )
      )
  );

  getAuthSuccess$ = createEffect(() =>
      this.action$.pipe(
          ofType(loginSuccess),
          map(async (auth) => {
            this.responseOK = true;
          })
        ),
      { dispatch: false }
    );

  getAuthError$ = createEffect(() =>
    this.action$.pipe(
        ofType(loginError),
        map(async (error) => {
          this.responseOK = false;
          this.errorResponse = error;
        })
      ),
    { dispatch: false }
  );
}