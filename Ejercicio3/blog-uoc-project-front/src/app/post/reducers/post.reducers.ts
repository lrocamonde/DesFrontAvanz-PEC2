import { Action, createReducer, on } from "@ngrx/store";
import { createPost, createPostError, createPostSuccess, deletePost, deletePostError, deletePostSuccess, dislikePost, dislikePostError, dislikePostSuccess, getPosts, getPostsById, getPostsByIdError, getPostsByIdSuccess, getPostsByUserId, getPostsByUserIdError, getPostsByUserIdSuccess, getPostsError, getPostsSuccess, likePost, likePostError, likePostSuccess, updatePost, updatePostError, updatePostSuccess } from "../actions";
import { PostDTO } from "../models/post.dto";

export interface PostState{
    posts: PostDTO[];
    userPosts: PostDTO[];
    post: PostDTO;
    loading: boolean;
    loaded: boolean;
    rowsAffected: number;
    error: any;
}

export const initialState: PostState = {
    posts: [],
    userPosts: [],
    post: new PostDTO('', '', 0, 0, new Date()),
    loading: false,
    loaded: false,
    error: null,
    rowsAffected: 0
}

const _postReducer = createReducer (
    initialState,
    on(getPosts, (state) => ({
        ...state, 
        loading:true,
        loaded: false,
        error: null,
        rowsAffected: 0
    })),
    on(getPostsSuccess, (state, {posts}) => ({
        ...state,
        error: null,
        loading: false,
        loaded: true,
        posts: [...posts]
    })),
    on(getPostsError, (state, {payload}) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),
    on(createPost, (state) => ({
        ...state,
        loading: true, 
        loaded: false,
        error: null
    })),
    on(createPostSuccess, (state, {post}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        post: post
    })),
    on(createPostError, (state, {payload}) => ({
        ...state,
        error: payload,
        loading: false,
        loaded: true
    })),
    on(updatePost, (state) => ({
        ...state,
        loading: true, 
        loaded: false,
        error: null
    })),
    on(updatePostSuccess, (state, {postUpd}) => ({
        ...state,
        loading: false, 
        loaded: true,
        error: null,
        post: postUpd
    })),
    on(updatePostError, (state, {payload}) => ({
        ...state,
        loading: false, 
        loaded: true,
        error: payload
    })),
    on(deletePost, (state, {postId}) => ({
        ...state,
        loading: true, 
        loaded: false,
        error: null
    })),    
    on(deletePostSuccess, (state, {deleteResponse}) => ({
        ...state,
        error: null,
        loading: false, 
        loaded: true,
        rowsAffected: deleteResponse          
    })),
    on(deletePostError, (state, {payload})=> ({
        ...state,
        loading: false, 
        loaded: true,
        error: payload,
    })),
    on(getPostsByUserId, (state) => ({
        ...state, 
        loading: true,
        loaded: false,
        error: null, 
        rowsAffected: 0})),
    on(getPostsByUserIdSuccess, (state, {posts}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        userPosts: [...posts]
    })),
    on(getPostsByUserIdError, (state, {payload})=> ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(getPostsById, (state) => ({
        ...state,
        loading: true,
        loaded: false,
        error: null, 
    })),
    on(getPostsByIdSuccess, (state, {post}) => ({
        ...state,
        post: post,
        loading: false,
        loaded: true,
    })),
    on(getPostsByIdError, (state, {payload})=> ({
        ...state,
        loading: false,
        loaded: true,
        error: payload
    })),
    on(likePost, (state, {postId}) => ({
        ...state,
        loaded: false,
        loading: true,
        error: null
    })),
    on(likePostSuccess, (state, {updateResponse}) => ({
        ...state, 
        loaded: true,
        loading: false,
        rowsAffected: updateResponse,
        error:null
    })),
    on(likePostError, (state, {payload})=> ({
        ...state,
        loaded: true,
        loading: false,
        error: payload,
    })),
    on(dislikePost, (state, {postId}) => ({
        ...state,
        loaded: false,
        loading: true,
        error: null

    })),
    on(dislikePostSuccess, (state, {updateResponse}) => ({
        ...state, 
        loaded: true,
        loading: false,
        rowsAffected: updateResponse,
        error:null
    })),
    on(dislikePostError, (state, {payload})=> ({
        ...state,
        loaded: true,
        loading: false,
        error: payload,
    }))
);

export function postReducer(state: PostState | undefined , action: Action){
    return _postReducer(state, action);
}