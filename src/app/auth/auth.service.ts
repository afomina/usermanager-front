import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {AuthRequest} from "./auth.request";
import {AuthResponse} from "./auth.response";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AuthService {
  loginUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {
  }

  login(authRequest: AuthRequest, callback, errorCallback) {
    this.http.post<AuthResponse>(this.loginUrl, authRequest, httpOptions)
      .subscribe(response => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('role', response.authorities[0]);
          return callback && callback();
        },
        error => errorCallback && errorCallback(error));
  }

  getAuthToken(): string {
    return localStorage.getItem('auth_token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') == 'admin';
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('role');
  }
}
