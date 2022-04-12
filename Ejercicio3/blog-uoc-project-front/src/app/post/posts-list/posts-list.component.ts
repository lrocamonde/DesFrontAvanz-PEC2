import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostDTO } from 'src/app/post/models/post.dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PostService } from 'src/app/post/services/post.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    private sharedService: SharedService
  ) {
    this.loadPosts();
  }

  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      try {
        this.postService.getPostsByUserId(userId).subscribe(posts => this.posts = posts);
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  createPost(): void {
    this.router.navigateByUrl('/user/post/');
  }

  updatePost(postId: string): void {
    this.router.navigateByUrl('/user/post/' + postId);
  }

  async deletePost(postId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete post with id: ' + postId + ' .');
    if (result) {
      try {
        this.postService.deletePost(postId).subscribe( rowsAffected => {
          if (rowsAffected.affected > 0) {
            this.loadPosts();
          }
        });   
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }
}
