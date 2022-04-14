import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDTO } from 'src/app/category/models/category.dto';
import { PostDTO } from 'src/app/post/models/post.dto';
import { CategoryService } from 'src/app/category/services/category.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PostService } from 'src/app/post/services/post.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getCategoriesByUserId } from 'src/app/category/actions';
import { createPost, getPostsById, updatePost } from '../actions';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  post: PostDTO;
  title: FormControl;
  description: FormControl;
  num_likes!: FormControl;
  num_dislikes!: FormControl;
  publication_date: FormControl;
  categories!: FormControl;

  postForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private validRequest: boolean;
  private postId: string | null;

  categoriesList!: CategoryDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.postId = this.activatedRoute.snapshot.paramMap.get('id');
    this.post = new PostDTO('', '', 0, 0, new Date());
    this.isUpdateMode = false;
    this.validRequest = false;

    this.title = new FormControl(this.post.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new FormControl(this.post.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.publication_date = new FormControl(
      formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.categories = new FormControl([]);

    // get categories by user and load multi select
    this.loadCategories();

    this.postForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      publication_date: this.publication_date,
      categories: this.categories,
    });
  }

  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.store.select('categoryApp').subscribe( state => {
        if(state.error){
          errorResponse = state.error.error;
          this.sharedService.errorLog(errorResponse);
        } else {
          this.categoriesList = state.categories;
        }
      });
      this.store.dispatch(getCategoriesByUserId({ userId: userId}));
    }
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;
    // update
    if (this.postId) {
      this.isUpdateMode = true;
      this.store.select('postApp').subscribe( state => {
        if (state.error) {
          errorResponse = state.error.error;
          this.sharedService.errorLog(errorResponse);
        } else{
          this.post = state.post;
          
          this.title.setValue(this.post.title);

          this.description.setValue(this.post.description);
  
          this.publication_date.setValue(
            formatDate(this.post.publication_date, 'yyyy-MM-dd', 'en')
          );
  
          let categoriesIds: string[] = [];
          this.post.categories.forEach((cat: CategoryDTO) => {
            categoriesIds.push(cat.categoryId);
          });
  
          this.categories.setValue(categoriesIds);
  
          this.postForm = this.formBuilder.group({
            title: this.title,
            description: this.description,
            publication_date: this.publication_date,
            categories: this.categories,
          });
        }
      });
      this.store.dispatch(getPostsById({postId: this.postId}));
    }
  }

  private editPost(): boolean {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.postId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.post.userId = userId;
        this.store.select('postApp').subscribe(async state => {
          if (state.error) {
            errorResponse = state.error.error;
            this.sharedService.errorLog(errorResponse);
          } else {
            responseOK = true;
          }

          await this.sharedService.managementToast(
            'postFeedback',
            responseOK,
            errorResponse
          );
  
          if (responseOK) {
            // Reset the form
            //this.registerForm.reset();
            // After reset form we set birthDate to today again (is an example)
            //this.birth_date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
            this.router.navigateByUrl('posts');
          }
        });
        this.store.dispatch(updatePost({postId: this.postId, post: this.post}));
      }
    }
    return responseOK;
  }

  private createPost(): boolean {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.post.userId = userId;
      this.store.select('postApp').subscribe(async state => {
        if (state.error) {
          errorResponse = state.error.error;
          this.sharedService.errorLog(errorResponse);
        } else {
          responseOK = true;
        }

        await this.sharedService.managementToast(
          'postFeedback',
          responseOK,
          errorResponse
        );

        if (responseOK) {
          // Reset the form
          //this.registerForm.reset();
          // After reset form we set birthDate to today again (is an example)
          //this.birth_date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
          this.router.navigateByUrl('posts');
        }
      });
      this.store.dispatch(createPost({ post: this.post }))
    }
    return responseOK;
  }

  async savePost() {
    this.isValidForm = false;

    if (this.postForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.post = this.postForm.value;

    if (this.isUpdateMode) {
      this.validRequest = await this.editPost();
    } else {
      this.validRequest = await this.createPost();
    }
  }
}
