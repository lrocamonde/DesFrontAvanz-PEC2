import { createAction, props } from "@ngrx/store";
import { CategoryDTO } from "../models/category.dto";

export const createCategory = createAction(
    '[CATEGORY] Create new category',
    props<{ category: CategoryDTO }>()
);

export const createCategorySuccess = createAction(
    '[CATEGORY] Create new category succeeded',
    props<{ category: CategoryDTO }>()
);

export const createCategoryError = createAction(
    '[CATEGORY] Create new category failed',
    props<{ payload: any }>()
);

export const updateCategory = createAction(
    '[CATEGORY] Update a category',
    props<{ categoryId: string, categoryUpd: CategoryDTO }>()
);

export const updateCategorySuccess = createAction(
    '[CATEGORY] Update category succeeded',
    props<{ categoryId: string, categoryUpd: CategoryDTO }>()
);

export const updateCategoryError = createAction(
    '[CATEGORY] Update category failed',
    props<{ payload: any }>()
);

export const getCategoriesByUserId = createAction(
    '[CATEGORY] Get categories by user Id',
    props<{ userId: string }>()
);

export const getCategoriesByUserIdSuccess = createAction(
    '[CATEGORY] Get categories by user Id succeeded',
    props<{ categories: CategoryDTO[] }>()
);

export const getCategoriesByUserIdError = createAction(
    '[CATEGORY] Get categories by user Id failed',
    props<{ payload: any }>()
);

export const deleteCategory = createAction(
    '[CATEGORY] Delete category',
    props<{ categoryId: string }>()
);

export const deleteCategorySuccess = createAction(
    '[CATEGORY] Delete category succeeded',
    props<{ deleteResponse: number }>()
);

export const deleteCategoryError = createAction(
    '[CATEGORY] Delete category failed',
    props<{ payload: any }>()
);