import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './user/users.component';
import { AppRoutingModule } from './app-routing.module';

import {EditUserComponent} from "./edit/edit-user.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
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
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
