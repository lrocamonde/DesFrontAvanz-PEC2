import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, finalize, map, mergeMap, of } from "rxjs";
import { SharedService } from "src/app/shared/services/shared.service";
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, getCategoriesByUserId, getCategoriesByUserIdError, getCategoriesByUserIdSuccess, getCategoryById, getCategoryByIdError, getCategoryByIdSuccess, updateCategory, updateCategoryError, updateCategorySuccess } from "../actions";
import { CategoryService } from "../services/category.service";

@Injectable()
export class CategoryEffects {
    
    responseOK: boolean = false;
    errorResponse: any;
    rowsAffected: number = 0;

    constructor(
        private action$: Actions,
        private categoryService: CategoryService,
        private sharedService: SharedService,
        private router: Router
    ) {}

    createCategory$ = createEffect(() => 
        this.action$.pipe(
            ofType(createCategory),
            exhaustMap((params) =>
                this.categoryService.createCategory(params.category).pipe(
                    map((category) => createCategorySuccess({category: category})),
                    catchError((err) => of(createCategoryError({payload: err}))),
                    finalize(async () => {
                      await this.sharedService.managementToast(
                        'categoriesFeedback',
                        this.responseOK,
                        this.errorResponse
                      );
            
                      if (this.responseOK) {
                        this.router.navigateByUrl('categories');
                      }
                    })
                )
            )
        )
    );

    createCategorySuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(createCategorySuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    createCategoryError$ = createEffect(() =>
        this.action$.pipe(
            ofType(createCategoryError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    updateCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategory),
            mergeMap((params) =>
                this.categoryService.updateCategory(params.categoryId, params.categoryUpd).pipe(
                    map((category) => updateCategorySuccess({categoryUpd: category})),
                    catchError((err) => of(updateCategoryError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                          'categoriesFeedback',
                          this.responseOK,
                          this.errorResponse
                        );
              
                        if (this.responseOK) {
                          this.router.navigateByUrl('categories');
                        }
                    })
                )
            )
        )
    );

    updateCategorySuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategorySuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    updateCategoryError$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategoryError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    getCategoriesByUserId$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoriesByUserId),
            mergeMap((params) =>
                this.categoryService.getCategoriesByUserId(params.userId).pipe(
                    map((categories) => getCategoriesByUserIdSuccess({categories: categories})),
                    catchError((err) => of(getCategoriesByUserIdError({payload: err})))
                )
            )
        )
    );

    getCategoriesByUserIdSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoriesByUserIdSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getCategoriesByUserIdError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoriesByUserIdError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    deleteCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategory),
            mergeMap((params) =>
                this.categoryService.deleteCategory(params.categoryId).pipe(
                    map((deleteResponse) => deleteCategorySuccess({deleteResponse: deleteResponse.affected})),
                    catchError((err) => of(deleteCategoryError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                          'categoriesFeedback',
                          this.responseOK,
                          this.errorResponse
                        );
              
                        if (this.responseOK) {
                          this.router.navigateByUrl('categories');
                        }
                    })
                )
            )
        )
    );

    deleteCategorySuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategorySuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    deleteCategoryError$ = createEffect(() =>
        this.action$.pipe(
            ofType(deleteCategoryError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    getCategoryById$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoryById),
            mergeMap((params) =>
                this.categoryService.getCategoryById(params.categoryId).pipe(
                    map((category) => getCategoryByIdSuccess({category: category})),
                    catchError((err) => of(getCategoryByIdError({payload: err})))
                )
            )
        )
    );

    getCategoryByIdSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoryByIdSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getCategoryByIdError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCategoryByIdError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );
}