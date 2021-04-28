import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { ConfigComponent } from './config/config.component';
import { UsersComponent } from './user/users.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';

import { httpInterceptorProviders } from './http-interceptors/index';
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
    ConfigComponent,
    UsersComponent,
    EditUserComponent,
    MessagesComponent,
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    httpInterceptorProviders
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
