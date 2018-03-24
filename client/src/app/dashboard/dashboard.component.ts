import { Component, OnInit, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AuthService } from '../auth/auth.service';
import { LeadService } from "../lead.service";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {LeadComponent} from "../lead/lead.component";
import {PropertyComponent} from "../property/property.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ AuthService ]
})
export class DashboardComponent implements OnInit {

  address: string = '';
  activeProperty: number;
  scrollConfig = PERFECT_SCROLLBAR_CONFIG;
  leads;
  username: string;
  password: string;
  auth: AuthService;

  @ViewChild(PropertyComponent) property;

  constructor(public authService: AuthService, public leadService: LeadService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadLeads();
    }
  }

  loadLeads() {
    let promise = null;
    if (this.authService.isLoggedIn()) {
      promise = this.leadService.getLeads();
    }

    if (promise) {
      promise.subscribe(data => {
        this.leads = data;
      });
    } else {
      console.log("Need to log in");
    }
  }

  loadProperty(id) {
    this.activeProperty = id;
    this.property.loadPropertyDetails(id);
  }

  login() {
    this.authService.login(this.username, this.password, () => {
      this.loadLeads()
    });
  }

}
