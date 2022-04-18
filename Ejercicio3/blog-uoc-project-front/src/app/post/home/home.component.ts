import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { PostDTO } from 'src/app/post/models/post.dto';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PostService } from 'src/app/post/services/post.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { dislikePost, getPosts, likePost } from '../actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  posts!: PostDTO[];
  showButtons: boolean;
  constructor(
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private store: Store<AppState>
  ) {
    this.showButtons = false;
    this.loadPosts();

    this.store.select('postApp').subscribe( state => {
      this.posts = state.posts;
      if(state.rowsAffected > 0){
        this.loadPosts();
      }
    })
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
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.showButtons = true;
    }
    this.store.dispatch(getPosts());
  }

  like(postId: string): void {
    this.store.dispatch(likePost({postId: postId}));
  }

  dislike(postId: string): void {
    this.store.dispatch(dislikePost({postId: postId}));
  }
}
