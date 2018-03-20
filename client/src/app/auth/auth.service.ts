import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {Restangular, RestangularModule} from "ngx-restangular";

@Injectable()
export class AuthService {

  access_token: string;
  refresh_token: string;
  expires_at: Date;
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
      this.rest.setDefaultHeaders({Authorization: "Bearer " + this.access_token});
    }
  }

  login(username, password) {
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
    ).subscribe(data => {
      this.access_token = data['access_token'];
      this.refresh_token = data['refresh_token'];
      let t = new Date();
      t.setSeconds(t.getSeconds() + data['expires_in']);
      this.expires_at = t;
      this.rest.setDefaultHeaders({Authorization: "Bearer " + this.access_token});

      localStorage.setItem('access_token', this.access_token);
      localStorage.setItem('refresh_token', this.refresh_token);
    })
  }
}
