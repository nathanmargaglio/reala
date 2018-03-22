import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Restangular, RestangularModule } from "ngx-restangular";
import { AuthService } from "./auth/auth.service";
import {PERFECT_SCROLLBAR_CONFIG} from "ngx-perfect-scrollbar";

@Injectable()
export class LeadService {

  api;
  @Output()
  loadedParcels = new EventEmitter<object>();

  constructor(private http: HttpClient, private restangular: Restangular){
    this.api = this.restangular.all('leads');
  }

  getLeads() {
    return this.api.getList();
  }

  getLeadDetails(id) {
    return this.restangular.one('leads', id).get();
  }

  purchaseLeadDetails(id) {
    let post = this.restangular.one('leads', id);
    post.customGET('', {purchase: 'True'});
    return post.get();
  }

  postLead(address) {
    console.log(address);
    return this.api.post({address: address});
  }
}
