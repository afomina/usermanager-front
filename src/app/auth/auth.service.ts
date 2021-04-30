import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {AuthRequest} from "./auth.request";
import {AuthResponse} from "./auth.response";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AuthService {
  loginUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {
  }

  login(authRequest: AuthRequest, callback) {
    this.http.post<AuthResponse>(this.loginUrl, authRequest, httpOptions)
      .subscribe(response => {
        localStorage.setItem('auth_token', response.token);
        return callback && callback();
      });
  }

  getAuthToken(): string {
    return localStorage.getItem('auth_token');
  }
}
