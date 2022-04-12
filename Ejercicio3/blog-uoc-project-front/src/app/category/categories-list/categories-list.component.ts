import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/category/models/category.dto';
import { CategoryService } from 'src/app/category/services/category.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    private sharedService: SharedService
  ) {
    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    let errorResponse: any;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      try {
        this.categoryService.getCategoriesByUserId(
          userId
        ).subscribe(categories => this.categories = categories);
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
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
      try {
        this.categoryService.deleteCategory(
          categoryId
        ).subscribe((rowsAffected) => {
          if (rowsAffected.affected > 0) {
            this.loadCategories();
          }
        });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }
}
