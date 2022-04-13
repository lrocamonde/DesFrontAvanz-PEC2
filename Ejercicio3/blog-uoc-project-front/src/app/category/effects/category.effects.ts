import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, getCategoriesByUserId, getCategoriesByUserIdError, getCategoriesByUserIdSuccess, updateCategory, updateCategoryError, updateCategorySuccess } from "../actions";
import { CategoryService } from "../services/category.service";

@Injectable()
export class CategoryEffects {
    
    constructor(
        private action$: Actions,
        private categoryService: CategoryService
    ) {}

    createCategory$ = createEffect(() => 
        this.action$.pipe(
            ofType(createCategory),
            mergeMap((params) =>
                this.categoryService.createCategory(params.category).pipe(
                    map((category) => createCategorySuccess({category: category})),
                    catchError((err) => of(createCategoryError({payload: err})))
                )
            )
        )
    );

    updateCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(updateCategory),
            mergeMap((params) =>
                this.categoryService.updateCategory(params.categoryId, params.categoryUpd).pipe(
                    map((category) => updateCategorySuccess({categoryId: category.categoryId, categoryUpd: category})),
                    catchError((err) => of(updateCategoryError({payload: err})))
                )
            )
        )
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
    )

    deleteCategory$ = createEffect(() =>
    this.action$.pipe(
        ofType(deleteCategory),
        mergeMap((params) =>
            this.categoryService.deleteCategory(params.categoryId).pipe(
                map((deleteResponse) => deleteCategorySuccess({deleteResponse: deleteResponse.affected})),
                catchError((err) => of(deleteCategoryError({payload: err})))
            )
        )
    )
)
}