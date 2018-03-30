import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Restangular, RestangularModule } from "ngx-restangular";

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
    console.log("ID", id);
    let post = this.restangular.one('properties', id);
    post.customGET('', {purchase: 'True'});
    return post.get();
  }

  update_data(id, data) {
    console.log("ID", id);
    let put = this.restangular.one('properties', id);
    put.customPUT(data);
    return put.put();
  }
}
