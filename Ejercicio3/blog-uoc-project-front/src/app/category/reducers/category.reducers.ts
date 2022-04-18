import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { createCategory, createCategoryError, createCategorySuccess, deleteCategory, deleteCategoryError, deleteCategorySuccess, getCategoriesByUserId, getCategoriesByUserIdError, getCategoriesByUserIdSuccess, getCategoryById, getCategoryByIdError, getCategoryByIdSuccess, updateCategory, updateCategoryError, updateCategorySuccess } from "../actions";
import { CategoryDTO } from "../models/category.dto";

export interface CategoryState {
    categories: CategoryDTO[];
    specificCategory: CategoryDTO;
    loading: boolean;
    loaded: boolean;
    error: any;
    rowsAffected: number;
}

export const initialState: CategoryState = {
    categories: [],
    specificCategory: new CategoryDTO('', '', ''),
    loading: false,
    loaded: false,
    error: null,
    rowsAffected: 0
}

const _categoryReducer = createReducer (
    initialState,
    on(createCategory, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(createCategorySuccess, (state, {category}) => ({
        ...state,
        loading: false,
        loaded: true,
        specificCategory: category,
        error: null
    })),
    on(createCategoryError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(updateCategory, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null
    })),
    on(updateCategorySuccess, (state, {categoryUpd}) => ({
        ...state,
        loading: false,
        loaded: true,
        specificCategory: categoryUpd,
        error: null
    })),
    on(updateCategoryError, (state, {payload}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(getCategoriesByUserId, (state) => ({
        ...state, 
        loading: true, 
        loaded: false, 
        error: null,
        rowsAffected: 0
    })),
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
        error: null,
        loading: true,
        loaded: false
    })),    
    on(deleteCategorySuccess, (state, {deleteResponse}) => ({
        ...state,
        error: null,
        rowsAffected: deleteResponse,
        loaded: true,
        loading: false         
    })),
    on(deleteCategoryError, (state, {payload})=> ({
        ...state,
        error: payload,
        loaded: true,
        loading: false 
    })),
    on(getCategoryById, (state) => ({
        ...state,
        loading: true, 
        loaded: false, 
        error: null
    })),
    on(getCategoryByIdSuccess, (state, {category}) => ({
        ...state,
        error: null,
        specificCategory: category,
        loading: false,
        loaded: true
    })),
    on(getCategoryByIdError, (state, {payload})=> ({
        ...state,
        loading: false,
        loaded: true,
        error: payload,
    }))

);

export function categoryReducer(state: CategoryState | undefined, action: Action) {
    return _categoryReducer(state, action);
}