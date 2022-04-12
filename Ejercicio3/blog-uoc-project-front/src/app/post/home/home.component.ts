import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { PostDTO } from 'src/app/post/models/post.dto';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PostService } from 'src/app/post/services/post.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private router: Router,
    private headerMenusService: HeaderMenusService
  ) {
    this.showButtons = false;
    this.loadPosts();
  }

  ngOnInit(): void {
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showButtons = headerInfo.showAuthSection;
        }
      }
    );
  }
  private async loadPosts(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.showButtons = true;
    }
    try {
      this.postService.getPosts().subscribe(posts => this.posts = posts);
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  async like(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      this.postService.likePost(postId).subscribe();
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }

  async dislike(postId: string): Promise<void> {
    let errorResponse: any;
    try {
      this.postService.dislikePost(postId).subscribe();
      this.loadPosts();
    } catch (error: any) {
      errorResponse = error.error;
      this.sharedService.errorLog(errorResponse);
    }
  }
}
