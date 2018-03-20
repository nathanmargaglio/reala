import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {Restangular, RestangularModule} from "ngx-restangular";

@Injectable()
export class AuthService {

  access_token: string;
  clientID: string;
  rest;

  constructor(private http: HttpClient, private restangular: Restangular){
    this.access_token = null;
    this.rest = restangular;
    this.clientID = '';

    this.http.get(
      environment.apiUrl + '/keys/',
    ).subscribe(data => {
      this.clientID= data['CLIENT_ID'];
    })

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
      this.rest.setDefaultHeaders({Authorization: "Bearer " + data['access_token']});
    })
  }
}
