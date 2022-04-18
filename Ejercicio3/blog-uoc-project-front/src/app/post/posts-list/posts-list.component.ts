import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostDTO } from 'src/app/post/models/post.dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PostService } from 'src/app/post/services/post.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { deletePost, getPostsByUserId } from '../actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  posts!: PostDTO[];
  constructor(
    private postService: PostService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.loadPosts();

    this.store.select('postApp').subscribe( state => {
      this.posts = state.userPosts;
      if(state.rowsAffected > 0) {
        this.loadPosts();
      }
    });
  }

  private loadPosts(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.store.dispatch(getPostsByUserId({userId: userId}));
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  async deletePost(postId: string): Promise<void> {

    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      this.store.dispatch(deletePost({postId: postId}));
    }
  }
}
