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
import { createCategory, updateCategory } from '../actions';

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
  private validRequest: boolean;
  private categoryId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
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
    this.validRequest = false;

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
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    // update
    if (this.categoryId) {
      this.isUpdateMode = true;
      try {
        this.categoryService.getCategoryById(
          this.categoryId
        ).subscribe((category) => {
          this.category = category

          this.title.setValue(this.category.title);

          this.description.setValue(this.category.description);
  
          this.css_color.setValue(this.category.css_color);
  
          this.categoryForm = this.formBuilder.group({
            title: this.title,
            description: this.description,
            css_color: this.css_color,
          });
        });
      } catch (error: any) {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    }
  }

  private editCategory(): boolean {
    let errorResponse: any;
    let responseOK: boolean = false;
    if (this.categoryId) {
      const userId = this.localStorageService.get('user_id');
      if (userId) {
        this.category.userId = userId;

        this.store.select('categoryApp').subscribe(async callback => {
          if(callback.error){
            errorResponse = callback.error.error;
            this.sharedService.errorLog(errorResponse);
          } else {
            responseOK = true;
          }

          await this.sharedService.managementToast(
            'categoryFeedback',
            responseOK,
            errorResponse
          );

          if (responseOK) {
            // Reset the form
            //this.registerForm.reset();
            // After reset form we set birthDate to today again (is an example)
            //this.birth_date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
            this.router.navigateByUrl('categories');
          }
        });

        this.store.dispatch(updateCategory({ categoryId: this.categoryId, categoryUpd: this.category}));
      }
    }
    return responseOK;
  }

  private createCategory(): boolean {
    let errorResponse: any;
    let responseOK: boolean = false;
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.category.userId = userId;

      this.store.select('categoryApp').subscribe( async callback => {
          if(callback.error){
            errorResponse = callback.error.error;
            this.sharedService.errorLog(errorResponse);
          } else{
            responseOK = true;
          }

          await this.sharedService.managementToast(
            'categoryFeedback',
            responseOK,
            errorResponse
          );
    
          if (responseOK) {
            // Reset the form
            //this.registerForm.reset();
            // After reset form we set birthDate to today again (is an example)
            //this.birth_date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
            this.router.navigateByUrl('categories');
          }
      })

      this.store.dispatch(createCategory( { category: this.category }));
    } 
    return responseOK;
  }

  async saveCategory() {
    this.isValidForm = false;

    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.category = this.categoryForm.value;

    if (this.isUpdateMode) {
      this.validRequest = await this.editCategory();
    } else {
      this.validRequest = await this.createCategory();
    }
  }
}
