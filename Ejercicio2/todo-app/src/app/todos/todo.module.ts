import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoButtonsComponent } from './todo-buttons/todo-buttons.component';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoListItemComponent,
    TodoAddComponent,
    TodoButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    TodoListItemComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoButtonsComponent
  ]
})
export class TodoModule { }
