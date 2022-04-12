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
import { AuthService } from 'src/app/auth/services/auth.service';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
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

  async login(): Promise<void> {
    let responseOK: boolean = false;
    let errorResponse: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;
    try {
      this.authService.login(this.loginUser).subscribe((authToken) => {
        this.loginUser.user_id = authToken.user_id;
        this.loginUser.access_token = authToken.access_token;
        // save token to localstorage for next requests
        this.localStorageService.set('user_id', this.loginUser.user_id);
        this.localStorageService.set('access_token', this.loginUser.access_token);
      });
      responseOK = true; 
    } catch (error: any) {
      console.log("Fallo");
      responseOK = false;
      errorResponse = error.error;
      const headerInfo: HeaderMenus = {
        showAuthSection: false,
        showNoAuthSection: true,
      };
      this.headerMenusService.headerManagement.next(headerInfo);

      this.sharedService.errorLog(error.error);
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
  }
}
