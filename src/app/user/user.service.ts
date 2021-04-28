import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {GetUsersResponse} from "./GetUsersResponse";
import {getUserResponse} from "./getUserResponse";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable()
export class UserService {
  usersUrl = 'http://localhost:8080/user';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  /** GET users from the server */
  getUsers() {
    return this.http.get<GetUsersResponse>(this.usersUrl);
  }

  getUser(id: string) {
    return this.http.get<getUserResponse>(`${this.usersUrl}/${id}`);
  }

  createUser(user: User) {
    console.warn(user);
    return this.http.post<User>(this.usersUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('createUser', user))
      );
  }

  /** DELETE: delete user from the server */
  deleteUser(id: string): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; // DELETE user/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser'))
      );
  }

  /** PUT: update user  */
  updateUser(id: string, user: User) {
    const url = `${this.usersUrl}/${id}`;
    return this.http.put<User>(url, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
  }
}
