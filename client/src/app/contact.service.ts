import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Restangular, RestangularModule } from "ngx-restangular";


@Injectable()
export class ContactService {

  api;
  @Output()
  loadedLeads = new EventEmitter<object>();

  constructor(private http: HttpClient, private restangular: Restangular){
    this.api = this.restangular.all('contacts');
  }

  getContacts() {
    return this.api.getList();
  }

  getContactDetails(id) {
    return this.restangular.one('contacts', id).get();
  }

  purchaseConactDetails(id) {
    let post = this.restangular.one('contacts', id);
    post.customGET('', {purchase: 'True'});
    return post.get();
  }

}
