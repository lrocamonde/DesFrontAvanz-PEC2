import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LocalStorageService } from "../services/local-storage.service";

@Injectable()
export class SharedEffects {

    constructor(
        private action$: Actions,
        private localStorageService: LocalStorageService
    ) {}

}