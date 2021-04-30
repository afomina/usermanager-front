import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

import {User} from './user';
import {GetUsersResponse} from "./GetUsersResponse";
import {UserResponse} from "./userResponse";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class UserService {
  usersUrl = 'http://localhost:8080/user';
  headers: HttpHeaders;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: authService.getAuthToken()
      });
  }

  /** GET users from the server */
  getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(this.usersUrl, {headers: this.headers});
  }

  getUser(id: string) {
    return this.http.get<UserResponse>(`${this.usersUrl}/${id}`, {headers: this.headers});
  }

  createUser(user: User) : Observable<User>{
    return this.http.post<User>(this.usersUrl, user, {headers: this.headers});
  }

  /** DELETE: delete user from the server */
  deleteUser(id: string): Observable<{}> {
    const url = `${this.usersUrl}/${id}`; // DELETE user/42
    return this.http.delete(url, {headers: this.headers});
  }

  /** PUT: update user  */
  updateUser(id: string, user: User) {
    const url = `${this.usersUrl}/${id}`;
    return this.http.put<User>(url, user, {headers: this.headers});
  }
}
