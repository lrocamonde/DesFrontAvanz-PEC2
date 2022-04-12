import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './category/categories-list/categories-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { HomeComponent } from './post/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PostFormComponent } from './post/post-form/post-form.component';
import { PostsListComponent } from './post/posts-list/posts-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './auth/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'posts',
    component: PostsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/post/:id',
    component: PostFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/category/:id',
    component: CategoryFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
