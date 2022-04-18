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
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.loadCategories();

    this.store.select('categoryApp').subscribe( state => {
        this.categories = state.categories;
        if(state.rowsAffected > 0){     
          this.loadCategories();
        }
    });
  }

  private loadCategories(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
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
      this.store.dispatch(deleteCategory({categoryId: categoryId}));
    }
  }
}
