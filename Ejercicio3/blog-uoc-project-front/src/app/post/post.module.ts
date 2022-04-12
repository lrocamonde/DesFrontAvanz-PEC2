import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from '../shared/Pipes/format-date.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    PostFormComponent,
    PostsListComponent,
    FormatDatePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent,
    PostFormComponent,
    PostsListComponent
  ]
})
export class PostModule { }
