import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Restangular, RestangularModule } from "ngx-restangular";
import { AuthService } from "./auth/auth.service";
import {PERFECT_SCROLLBAR_CONFIG} from "ngx-perfect-scrollbar";

@Injectable()
export class PropertyService {

  api;
  @Output()
  loadedLeads = new EventEmitter<object>();

  constructor(private http: HttpClient, private restangular: Restangular){
    this.api = this.restangular.all('properties');
  }

  getProperties() {
    return this.api.getList();
  }

  getPropertyDetails(id) {
    return this.restangular.one('properties', id).get();
  }

  purchasePropertyDetails(id) {
    let post = this.restangular.one('leads', id);
    post.customGET('', {purchase: 'True'});
    return post.get();
  }
}
