import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.APIURL + '/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authStatusListener = new Subject<boolean>();
  private token: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  // get token
  // tslint:disable-next-line: typedef
  getToken() {
    return this.token;
  }

  // get isAuth
  // tslint:disable-next-line: typedef
  getIsAuth() {
    return this.isAuthenticated;
  }

  // get userId
  // tslint:disable-next-line: typedef
  getUserId() {
    return this.userId;
  }

  // auth status listener
  // tslint:disable-next-line: typedef
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // signup
  // tslint:disable-next-line: typedef
  signup(name: string, email: string, password: string) {
    this.http.post(BACKEND_URL + '/signup', { name, email, password })
      .subscribe(() => {
        console.log('New user created');
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  // login
  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + '/login', { email, password })
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          console.log('User logged In');
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        this.authStatusListener.next(false);
      });
  }

  // auto auth user
  // tslint:disable-next-line: typedef
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // clear auth data
  // tslint:disable-next-line: typedef
  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  // logout
  // tslint:disable-next-line: typedef
  logout() {
    console.log('User with userId' + this.userId + ' logged out');
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  // get auth data
  // tslint:disable-next-line: typedef
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  // set auth timer
  // tslint:disable-next-line: typedef
  private setAuthTimer(duration: number) {
    console.log(`Setting timer: ${duration}`);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // save auth data
  // tslint:disable-next-line: typedef
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

}
