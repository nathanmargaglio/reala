import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Restangular, RestangularModule } from "ngx-restangular";

@Injectable()
export class AuthService {

  access_token: string;
  refresh_token: string;
  expires_at: number;
  clientID: string;
  rest;

  constructor(private http: HttpClient, private restangular: Restangular){
    this.access_token = null;
    this.refresh_token = null;
    this.expires_at = null;

    this.rest = restangular;
    this.clientID = '';

    this.http.get(
      environment.apiUrl + '/keys/',
    ).subscribe(data => {
      this.clientID= data['CLIENT_ID'];
    });

    if (localStorage.getItem('access_token')) {
      this.access_token = localStorage.getItem('access_token');
      this.refresh_token = localStorage.getItem('refresh_token');
      this.expires_at = parseInt(localStorage.getItem('expires_at'));

      if (this.isLoggedIn()) {
        this.rest.setDefaultHeaders({Authorization: "Bearer " + this.access_token});
      }
    }
  }

  login(username, password, callback=null) {
    let headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(this.clientID + ":")}
      );

    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('grant_type', 'password');

    this.http.post(
      environment.apiUrl + '/o/token/',
      body,
      {
        headers: headers
      }
    ).subscribe((data) => this.setLoginData(data, callback));
  }

  setLoginData(data, callback=null) {
    this.access_token = data['access_token'];
    this.refresh_token = data['refresh_token'];
    let t = Math.floor(Date.now() / 1000);
    this.expires_at = t + data['expires_in'];
    this.rest.setDefaultHeaders({Authorization: "Bearer " + this.access_token});

    localStorage.setItem('access_token', this.access_token);
    localStorage.setItem('refresh_token', this.refresh_token);
    localStorage.setItem('expires_at', this.expires_at + '');

    if (callback) {
      callback();
    }
  }

  isLoggedIn() {
    if (this.expires_at === null) return false;
    return this.expires_at > Math.floor(Date.now() / 1000);
  }
}
