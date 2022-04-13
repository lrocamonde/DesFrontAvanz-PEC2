import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, getCategoriesByUserId, getCategoriesByUserIdError, getCategoriesByUserIdSuccess, updateCategory, updateCategoryError, updateCategorySuccess } from "../actions";
import { CategoryDTO } from "../models/category.dto";

export interface CategoryState {
    categories: CategoryDTO[];
    loading: boolean;
    loaded: boolean;
    error: any;
    rowsAffected: number;
}

export const initialState: CategoryState = {
    categories: [],
    loading: false,
    loaded: false,
    error: null,
    rowsAffected: 0
}

const _categoryReducer = createReducer (
    initialState,
    on(createCategory, (state) => ({...state})),
    on(createCategorySuccess, (state, {category}) => ({
        ...state,
        categories: [...state.categories, category],
        error: null
    })),
    on(createCategoryError, (state, {payload}) => ({
        ...state,
        error: payload
    })),
    on(updateCategory, (state) => ({...state})),
    on(updateCategorySuccess, (state, {categoryId, categoryUpd}) => ({
        ...state,
        error: null,
        categories: [...state.categories.map((category) => {
            if(category.categoryId === categoryId){
                return categoryUpd;
            } else{
                return category;
            }
        })]
    })),
    on(updateCategoryError, (state, {payload}) => ({
        ...state,
        error: payload
    })),
    on(getCategoriesByUserId, (state) => ({...state, loading: true})),
    on(getCategoriesByUserIdSuccess, (state, {categories}) => ({
        ...state,
        error: null,
        categories: [...categories],
        loading: false,
        loaded: true
    })),
    on(getCategoriesByUserIdError, (state, {payload}) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),
    on(deleteCategory, (state, {categoryId}) => ({
        ...state,
        categories: [...state.categories.filter(category => category.categoryId !== categoryId)]
    })),    
    on(deleteCategorySuccess, (state, {deleteResponse}) => ({
        ...state,
        error: null,
        rowsAffected: deleteResponse          
    })),
    on(deleteCategoryError, (state, {payload})=> ({
        ...state,
        error: payload,
    }))
);

export function categoryReducer(state: CategoryState | undefined, action: Action) {
    return _categoryReducer(state, action);
}