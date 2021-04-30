import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./user/users.component";
import {EditUserComponent} from "./edit/edit-user.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'user/:id', component: EditUserComponent},
  {path: '', component: AuthComponent},
  {path: 'login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
