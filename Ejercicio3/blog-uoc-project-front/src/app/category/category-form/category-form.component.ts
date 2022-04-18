import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { CategoryDTO } from 'src/app/category/models/category.dto';
import { CategoryService } from 'src/app/category/services/category.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { createCategory, getCategoryById, updateCategory } from '../actions';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  category: CategoryDTO;
  title: FormControl;
  description: FormControl;
  css_color: FormControl;

  categoryForm: FormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.isValidForm = null;
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.category = new CategoryDTO('', '', '');
    this.isUpdateMode = false;

    this.title = new FormControl(this.category.title, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.description = new FormControl(this.category.description, [
      Validators.required,
      Validators.maxLength(255),
    ]);

    this.css_color = new FormControl(this.category.css_color, [
      Validators.required,
      Validators.maxLength(7),
    ]);

    this.categoryForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      css_color: this.css_color,
    });

    this.store.select('categoryApp').subscribe((categories) => {
      this.category = categories.specificCategory;
  
      this.title.setValue(this.category.title);
  
      this.description.setValue(this.category.description);
  
      this.css_color.setValue(this.category.css_color);
  
      this.categoryForm = this.formBuilder.group({
        title: this.title,
        description: this.description,
        css_color: this.css_color,
      });
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    // update
    if (this.categoryId) {
      this.isUpdateMode = true;
      this.store.dispatch(getCategoryById({categoryId: this.categoryId}))
    } else {
      this.categoryForm.reset();
    }
  }

  private editCategory(): void {
    if (this.categoryId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.category.userId = userId;
        this.store.dispatch(updateCategory({ categoryId: this.categoryId, categoryUpd: this.category}));
      }
    }
  }

  private createCategory(): void {
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.category.userId = userId;

      this.store.dispatch(createCategory( { category: this.category }));
    } 
  }

  async saveCategory() {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.category = this.categoryForm.value;

    if (this.isUpdateMode) {
       this.editCategory();
    } else {
      this.createCategory();
    }
  }
}
