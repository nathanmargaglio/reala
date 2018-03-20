import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { AuthService } from '../auth/auth.service';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AuthService ]
})
export class DashboardComponent implements OnInit {

  address: string = '';
  scrollConfig = PERFECT_SCROLLBAR_CONFIG;
  parcels_api;
  parcels;
  username: string;
  password: string;
  auth: AuthService;
  constructor(private restangular: Restangular, public authService: AuthService) { }

  ngOnInit() {
    this.parcels_api = this.restangular.all('leads');
    this.loadParcels();
  }

  loadParcels(event=true) {
    this.parcels_api.getList().subscribe(data => {
      this.parcels = data;
    })
  }

  login() {
    this.authService.login(this.username, this.password);
  }

}
