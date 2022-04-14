import { createAction, props } from "@ngrx/store";
import { PostDTO } from "../models/post.dto";

export const getPosts = createAction(
    '[POST] Get posts'
);

export const getPostsSuccess = createAction(
    '[POST] Get posts succeeded',
    props<{posts: PostDTO[]}>()
);

export const getPostsError = createAction(
    '[POST] Get posts failed',
    props<{payload: any[]}>()
);

export const createPost = createAction(
    '[POST] Create post',
    props<{post: PostDTO}>()
);

export const createPostSuccess = createAction(
    '[POST] Create post succeeded',
    props<{post: PostDTO}>()
);

export const createPostError = createAction(
    '[POST] Create post failed',
    props<{payload: any[]}>()
);

export const updatePost = createAction(
    '[POST] Update post',
    props<{postId: string, post: PostDTO}>()
);

export const updatePostSuccess = createAction(
    '[POST] Update post succeeded',
    props<{postUpd: PostDTO}>()
);

export const updatePostError = createAction(
    '[POST] Update post failed',
    props<{payload: any[]}>()
);

export const deletePost = createAction(
    '[POST] Delete post',
    props<{ postId: string }>()
);

export const deletePostSuccess = createAction(
    '[POST] Delete post succeeded',
    props<{ deleteResponse: number }>()
);

export const deletePostError = createAction(
    '[POST] Delete post failed',
    props<{ payload: any }>()
);

export const getPostsByUserId = createAction(
    '[POST] Get posts by user Id',
    props<{ userId: string }>()
);

export const getPostsByUserIdSuccess = createAction(
    '[POST] Get posts by user Id succeeded',
    props<{ posts: PostDTO[] }>()
);

export const getPostsByUserIdError = createAction(
    '[POST] Get posts by user Id failed',
    props<{ payload: any }>()
);

export const getPostsById = createAction(
    '[POST] Get posts by Id',
    props<{ postId: string }>()
);

export const getPostsByIdSuccess = createAction(
    '[POST] Get posts by Id succeeded',
    props<{ post: PostDTO }>()
);

export const getPostsByIdError = createAction(
    '[POST] Get posts by Id failed',
    props<{ payload: any }>()
);

export const likePost = createAction(
    '[POST] Like post',
    props<{ postId: string }>()
);

export const likePostSuccess = createAction(
    '[POST] Like post succeeded',
    props<{ updateResponse: number }>()
);

export const likePostError = createAction(
    '[POST] Like post failed',
    props<{ payload: any }>()
);

export const dislikePost = createAction(
    '[POST] Dislike post',
    props<{ postId: string }>()
);

export const dislikePostSuccess = createAction(
    '[POST] Dislike post succeeded',
    props<{ updateResponse: number }>()
);

export const dislikePostError = createAction(
    '[POST] Disike post failed',
    props<{ payload: any }>()
);