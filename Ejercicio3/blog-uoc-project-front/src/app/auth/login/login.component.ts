import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/auth/models/auth.dto';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { login } from '../actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthDTO('', '', '', '');

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {}

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;


    this.store.select('authApp').subscribe(async (callback) =>{

      if(callback.error){

        console.log("Fallo");
        responseOK = false;
        errorResponse = callback.error.error;
        const headerInfo: HeaderMenus = {
          showAuthSection: false,
          showNoAuthSection: true,
        };
        this.headerMenusService.headerManagement.next(headerInfo);
  
        this.sharedService.errorLog(callback.error.error);

      } else{
        
        console.log("Correcto");
        responseOK = true; 
        this.localStorageService.set('user_id', callback.auth.user_id);
        this.localStorageService.set('access_token', callback.auth.access_token);

      }
      
      await this.sharedService.managementToast(
        'loginFeedback',
        responseOK,
        errorResponse
      );
  
      if (responseOK) {
        const headerInfo: HeaderMenus = {
          showAuthSection: true,
          showNoAuthSection: false,
        };
        // update options menu
        this.headerMenusService.headerManagement.next(headerInfo);
        this.router.navigateByUrl('home');
      }

    })

    this.store.dispatch(login({ auth: new AuthDTO('', '',this.loginUser.email, this.loginUser.password)}));

  }
}
