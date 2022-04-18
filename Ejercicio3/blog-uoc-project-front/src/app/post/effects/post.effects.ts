import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, finalize, map, mergeMap, of } from "rxjs";
import { SharedService } from "src/app/shared/services/shared.service";
import { createPost, createPostError, createPostSuccess, deletePost, deletePostError, deletePostSuccess, dislikePost, dislikePostError, dislikePostSuccess, getPosts, getPostsById, getPostsByIdError, getPostsByIdSuccess, getPostsByUserId, getPostsByUserIdError, getPostsByUserIdSuccess, getPostsError, getPostsSuccess, likePost, likePostError, likePostSuccess, updatePost, updatePostError, updatePostSuccess } from "../actions";
import { PostService } from "../services/post.service";

@Injectable()
export class PostEffects {
    
    responseOK: boolean = false;
    errorResponse: any;

    constructor(
        private action$: Actions,
        private postService: PostService,
        private sharedService: SharedService,
        private router: Router
    ) {}

    
    getPosts$ = createEffect(() => 
        this.action$.pipe(
            ofType(getPosts),
            mergeMap(() => 
                this.postService.getPosts().pipe(
                    map((posts) => getPostsSuccess({posts: posts})),
                    catchError((error) => of(getPostsError({payload: error})))
                )
            )
        )
    );

    getPostsSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getPostsError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

    createPost$ = createEffect(() => 
        this.action$.pipe(
            ofType(createPost),
            mergeMap((params) => 
                this.postService.createPost(params.post).pipe(
                    map((post) => createPostSuccess({post: post})),
                    catchError((err) => of(createPostError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'postsFeedback',
                            this.responseOK,
                            this.errorResponse
                          );

                          if (this.responseOK) {
                            this.router.navigateByUrl('posts');
                        }
                    })
                )
            )
        )
    );

    createPostSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(createPostSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    createPostError$ = createEffect(() =>
        this.action$.pipe(
            ofType(createPostError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );


    updatePost$ = createEffect(() => 
        this.action$.pipe(
            ofType(updatePost),
            mergeMap((params) => 
                this.postService.updatePost(params.postId, params.post).pipe(
                    map((post) => updatePostSuccess({postUpd: post})),
                    catchError((err) => of(updatePostError({payload: err}))),
                    finalize(async () => {
                        await this.sharedService.managementToast(
                            'postsFeedback',
                            this.responseOK,
                            this.errorResponse
                          );

                          if (this.responseOK) {
                            this.router.navigateByUrl('posts');
                        }
                    })
                )
            )
        )
    );

    updatePostSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(updatePostSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    updatePostError$ = createEffect(() =>
        this.action$.pipe(
            ofType(updatePostError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
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

    deletePostSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(deletePostSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    deletePostError$ = createEffect(() =>
        this.action$.pipe(
            ofType(deletePostError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
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

    getPostsByUserIdSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsByUserIdSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getPostsByUserIdError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsByUserIdError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
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

    getPostsByIdSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsByIdSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    getPostsByIdError$ = createEffect(() =>
        this.action$.pipe(
            ofType(getPostsByIdError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
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
    );

    likePostSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(likePostSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    likePostError$ = createEffect(() =>
        this.action$.pipe(
            ofType(likePostError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );

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
    );

    dislikePostSuccess$ = createEffect(() =>
        this.action$.pipe(
            ofType(dislikePostSuccess),
            map(() => {
                this.responseOK = true;
            })
        ),
        { dispatch: false }
    );

    dislikePostError$ = createEffect(() =>
        this.action$.pipe(
            ofType(dislikePostError),
            map((error) => {
                this.responseOK = false;
                this.errorResponse = error.payload.error;
                this.sharedService.errorLog(error.payload.error);
            })
        ),
        { dispatch: false }
    );
}