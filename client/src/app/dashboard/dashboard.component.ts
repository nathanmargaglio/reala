import { Component, OnInit, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AuthService } from '../auth/auth.service';
import { LeadService } from "../lead.service";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {LeadComponent} from "../lead/lead.component";
import {PropertyComponent} from "../property/property.component";
import {ContactComponent} from "../contact/contact.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ AuthService ]
})
export class DashboardComponent implements OnInit {

  address: string = '';
  scrollConfig = PERFECT_SCROLLBAR_CONFIG;
  leads;
  username: string;
  password: string;
  auth: AuthService;

  @ViewChild(PropertyComponent) property;
  @ViewChild(ContactComponent) contact;

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

  loadProperty(properties) {
    console.log(properties);
    if (properties) {
      // TODO: Load all Property data
      this.property.loadPropertyDetails(properties[0]);
    }
  }

  loadContact(contacts) {
    console.log(contacts);
    if (contacts) {
      // TODO: Load all Contact data
      this.contact.loadContactDetails(contacts[0]);
    }
  }

  login() {
    this.authService.login(this.username, this.password, () => {
      this.loadLeads()
    });
  }

}
