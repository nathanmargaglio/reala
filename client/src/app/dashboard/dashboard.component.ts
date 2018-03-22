import { Component, OnInit, ViewChild } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AuthService } from '../auth/auth.service';
import { LeadService } from "../lead.service";
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import {LeadComponent} from "../lead/lead.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AuthService ]
})
export class DashboardComponent implements OnInit {

  address: string = '';
  estated: object;
  scrollConfig = PERFECT_SCROLLBAR_CONFIG;
  parcels;
  username: string;
  password: string;
  auth: AuthService;

  @ViewChild(LeadComponent) lead;

  constructor(public authService: AuthService, public leadService: LeadService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadParcels();
    }
  }

  loadParcels() {
    let promise = null;
    if (this.authService.isLoggedIn()) {
      promise = this.leadService.getLeads();
    }

    if (promise) {
      promise.subscribe(data => {
        this.parcels = data;
      });
    } else {
      console.log("Need to log in");
    }
  }

  loadLeadDetails(id) {
    this.lead.loadLeadDetails(id);
  }

  login() {
    this.authService.login(this.username, this.password);
  }

}
