import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CategoryDTO } from 'src/app/category/models/category.dto';
import { CategoryService } from 'src/app/category/services/category.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { deleteCategory, getCategoriesByUserId } from '../actions';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
})
export class CategoriesListComponent {
  categories!: CategoryDTO[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.loadCategories();
  }

  private loadCategories(): void {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.store.select('categoryApp').subscribe( state => {
        if(state.error){
          errorResponse = state.error.error;
          this.sharedService.errorLog(errorResponse);
        } else {
          this.categories = state.categories;
        }
      });
      this.store.dispatch(getCategoriesByUserId({ userId: userId}));
    }
  }

  createCategory(): void {
    this.router.navigateByUrl('/user/category/');
  }

  updateCategory(categoryId: string): void {
    this.router.navigateByUrl('/user/category/' + categoryId);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete category with id: ' + categoryId + ' .'
    );
    if (result) {
      this.store.select('categoryApp').subscribe( state => {
        if(state.error){
          errorResponse = state.error.error;
          this.sharedService.errorLog(errorResponse);
        } else {
          if(state.rowsAffected > 0){
            this.loadCategories();
          }
        }
      });
      this.store.dispatch(deleteCategory({categoryId: categoryId}));
    }
  }
}
