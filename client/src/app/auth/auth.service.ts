import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import {Restangular, RestangularModule} from "ngx-restangular";

@Injectable()
export class AuthService {

  access_token: string;
  constructor(private http: HttpClient, private restangular: Restangular){
    this.access_token = null;
    this.restangular = restangular;
  }

  login(username, password) {
    let headers = new HttpHeaders({
      "Authorization": "Basic " + btoa(environment.auth.clientID + ":")}
      );

    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    body.append('grant_type', 'password');

    this.http.post(
      environment.auth.domain + 'token/',
      body,
      {
        headers: headers
      }
    ).subscribe(data => {
      this.access_token = data['access_token'];
      this.restangular.setDefaultHeaders({Authorization: "Bearer " + data['access_token']});
    })
  }
}
