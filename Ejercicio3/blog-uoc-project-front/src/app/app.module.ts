import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesListComponent } from './category/categories-list/categories-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './post/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { PostsListComponent } from './post/posts-list/posts-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { FormatDatePipe } from './shared/Pipes/format-date.pipe';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    CategoryModule,
    PostModule,
    SharedModule,
    UserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
