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
    updatePosts: boolean;
}

export const initialState: PostState = {
    posts: [],
    userPosts: [],
    post: new PostDTO('', '', 0, 0, new Date()),
    loading: false,
    loaded: false,
    error: null,
    rowsAffected: 0,
    updatePosts: false
}

const _postReducer = createReducer (
    initialState,
    on(getPosts, (state) => ({...state, loading:true, updatePosts: false})),
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
    on(createPost, (state) => ({...state})),
    on(createPostSuccess, (state, {post}) => ({
        ...state,
        error: null,
        posts:[...state.posts, post]
    })),
    on(createPostError, (state, {payload}) => ({
        ...state,
        error: payload
    })),
    on(updatePost, (state) => ({...state})),
    on(updatePostSuccess, (state, {postUpd}) => ({
        ...state,
        error: null,
        categories: [...state.posts.map((post) => {
            if(post.postId === postUpd.postId){
                return postUpd;
            } else{
                return post;
            }
        })]
    })),
    on(updatePostError, (state, {payload}) => ({
        ...state,
        error: payload
    })),
    on(deletePost, (state, {postId}) => ({
        ...state,
        categories: [...state.posts.filter(post => post.postId !== postId)]
    })),    
    on(deletePostSuccess, (state, {deleteResponse}) => ({
        ...state,
        error: null,
        rowsAffected: deleteResponse          
    })),
    on(deletePostError, (state, {payload})=> ({
        ...state,
        error: payload,
    })),
    on(getPostsByUserId, (state) => ({...state, loading: true, rowsAffected: 0})),
    on(getPostsByUserIdSuccess, (state, {posts}) => ({
        ...state,
        loading: false,
        loaded: true,
        error: null,
        userPosts: [...posts],
        rowsAffected: 0
    })),
    on(getPostsByUserIdError, (state, {payload})=> ({
        ...state,
        loading: false,
        loaded: true,
        error: payload,
    })),
    on(getPostsById, (state) => ({...state})),
    on(getPostsByIdSuccess, (state, {post}) => ({
        ...state,
        post: post
    })),
    on(getPostsByIdError, (state, {payload})=> ({
        ...state,
        error: payload,
    })),
    on(likePost, (state, {postId}) => ({
        ...state,
        updatePosts:true,
        posts:[...state.posts.map((post) =>{
            if(post.postId === postId){
                const num_likes = post.num_likes +1;
                return {
                    ...post,
                    num_likes: num_likes
                };
            } else {
                return post;
            }
        })]
    })),
    on(likePostSuccess, (state, {updateResponse}) => ({
        ...state, 
        error:null
    })),
    on(likePostError, (state, {payload})=> ({
        ...state,
        error: payload,
    })),
    on(dislikePost, (state, {postId}) => ({
        ...state,
        updatePosts:true,
        posts:[...state.posts.map((post) =>{
            if(post.postId === postId){
                const num_dislikes = post.num_dislikes +1;
                return {
                    ...post,
                    num_dislikes: num_dislikes
                };
            } else {
                return post;
            }
        })]
    })),
    on(dislikePostSuccess, (state, {updateResponse}) => ({
        ...state, 
        error:null
    })),
    on(dislikePostError, (state, {payload})=> ({
        ...state,
        error: payload,
    }))
);

export function postReducer(state: PostState | undefined , action: Action){
    return _postReducer(state, action);
}