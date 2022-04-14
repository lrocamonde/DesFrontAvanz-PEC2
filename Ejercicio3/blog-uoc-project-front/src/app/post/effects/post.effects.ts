import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { createPost, createPostError, createPostSuccess, deletePost, deletePostError, deletePostSuccess, dislikePost, dislikePostError, dislikePostSuccess, getPosts, getPostsById, getPostsByIdError, getPostsByIdSuccess, getPostsByUserId, getPostsByUserIdError, getPostsByUserIdSuccess, getPostsError, getPostsSuccess, likePost, likePostError, likePostSuccess, updatePost, updatePostError, updatePostSuccess } from "../actions";
import { PostService } from "../services/post.service";

@Injectable()
export class PostEffects {
    
    constructor(
        private action$: Actions,
        private postService: PostService
    ) {}

    
    getPosts$ = createEffect(() => 
        this.action$.pipe(
            ofType(getPosts),
            mergeMap(() => 
                this.postService.getPosts().pipe(
                    map((posts) => getPostsSuccess({posts: posts})),
                    catchError((err) => of(getPostsError({payload: err})))
                )
            )
        )
    );

    createPost$ = createEffect(() => 
        this.action$.pipe(
            ofType(createPost),
            mergeMap((params) => 
                this.postService.createPost(params.post).pipe(
                    map((post) => createPostSuccess({post: post})),
                    catchError((err) => of(createPostError({payload: err})))
                )
            )
        )
    );

    updatePost$ = createEffect(() => 
        this.action$.pipe(
            ofType(updatePost),
            mergeMap((params) => 
                this.postService.updatePost(params.postId, params.post).pipe(
                    map((post) => updatePostSuccess({postUpd: post})),
                    catchError((err) => of(updatePostError({payload: err})))
                )
            )
        )
    );

    deletePost$ = createEffect(() => 
        this.action$.pipe(
            ofType(deletePost),
            mergeMap((params) => 
                this.postService.deletePost(params.postId).pipe(
                    map((deleteResponse) => deletePostSuccess({deleteResponse: deleteResponse.affected})),
                    catchError((err) => of(deletePostError({payload: err})))
                )
            )
        )
    );

    getPostsByUserId$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsByUserId),
            mergeMap((params) =>
                this.postService.getPostsByUserId(params.userId).pipe(
                    map((posts) => getPostsByUserIdSuccess({posts: posts})),
                    catchError((err) => of(getPostsByUserIdError({payload: err})))
                )
            )
        )
    );

    getPostsById$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsById),
            mergeMap((params) =>
                this.postService.getPostById(params.postId).pipe(
                    map((post) => getPostsByIdSuccess({post: post})),
                    catchError((err) => of(getPostsByIdError({payload: err})))
                )
            )
        )
    );

    likePost$ = createEffect(() =>
        this.action$.pipe(
            ofType(likePost),
            mergeMap((params) =>
                this.postService.likePost(params.postId).pipe(
                    map((updateResponse) => likePostSuccess({updateResponse: updateResponse.affected})),
                    catchError((err) => of(likePostError({payload: err})))
                )    
            )
        )
    )

    dislikePost$ = createEffect(() =>
        this.action$.pipe(
            ofType(dislikePost),
            mergeMap((params) =>
                this.postService.dislikePost(params.postId).pipe(
                    map((updateResponse) => dislikePostSuccess({updateResponse: updateResponse.affected})),
                    catchError((err) => of(dislikePostError({payload: err})))
                )    
            )
        )
    )
}