import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./user/users.component";
import {EditUserComponent} from "./edit/edit-user.component";

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'user/:id', component: EditUserComponent}
]; // sets up routes constant where you define your routes

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
