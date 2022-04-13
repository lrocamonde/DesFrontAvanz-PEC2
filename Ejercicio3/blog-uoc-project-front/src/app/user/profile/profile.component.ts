import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserDTO } from 'src/app/user/models/user.dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from 'src/app/user/services/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getUserById, updateUser } from '../actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileUser: UserDTO;

  name: FormControl;
  surname_1: FormControl;
  surname_2: FormControl;
  alias: FormControl;
  birth_date: FormControl;
  email: FormControl;
  password: FormControl;

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.profileUser = new UserDTO('', '', '', '', new Date(), '', '');

    this.isValidForm = null;

    this.name = new FormControl(this.profileUser.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_1 = new FormControl(this.profileUser.surname_1, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.surname_2 = new FormControl(this.profileUser.surname_2, [
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.alias = new FormControl(this.profileUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.birth_date = new FormControl(
      formatDate(this.profileUser.birth_date, 'yyyy-MM-dd', 'en'),
      [Validators.required]
    );

    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.profileUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      surname_1: this.surname_1,
      surname_2: this.surname_2,
      alias: this.alias,
      birth_date: this.birth_date,
      email: this.email,
      password: this.password,
    });
  }

  async ngOnInit(): Promise<void> {
    let errorResponse: any;

    // load user data
    const userId = this.localStorageService.get('user_id');
    if (userId) {
      this.store.select('userApp').subscribe( callback => {
        if(callback.error){
          errorResponse = callback.error.error;
          this.sharedService.errorLog(errorResponse);
        } else {
          const userData = callback.user;

          this.name.setValue(userData.name);
          this.surname_1.setValue(userData.surname_1);
          this.surname_2.setValue(userData.surname_2);
          this.alias.setValue(userData.alias);
          this.birth_date.setValue(
            formatDate(userData.birth_date, 'yyyy-MM-dd', 'en')
          );
          this.email.setValue(userData.email);
  
          this.profileForm = this.formBuilder.group({
            name: this.name,
            surname_1: this.surname_1,
            surname_2: this.surname_2,
            alias: this.alias,
            birth_date: this.birth_date,
            email: this.email,
            password: this.password,
          });
        }
      });

      this.store.dispatch(getUserById({userId}));
    }
  }

  updateUser(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.store.select('userApp').subscribe(async callback => {
        if(callback.error){
          responseOK = false;
          errorResponse = callback.error.error;

          this.sharedService.errorLog(errorResponse);
        } else{
          responseOK = true;
        }

        await this.sharedService.managementToast(
          'profileFeedback',
          responseOK,
          errorResponse
        );
      });

      this.store.dispatch(updateUser({userId: userId, user: this.profileUser}));
    }
  }
}
