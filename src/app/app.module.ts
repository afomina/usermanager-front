import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './user/users.component';
import { AppRoutingModule } from './app-routing.module';

import {EditUserComponent} from "./edit/edit-user.component";
import {AuthComponent} from "./auth/auth.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    EditUserComponent,
    AuthComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
