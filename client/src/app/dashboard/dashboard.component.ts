import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  address: string = '';
  scrollConfig = PERFECT_SCROLLBAR_CONFIG;
  parcels_api;
  parcels;
  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.parcels_api = this.restangular.all('leads');
    this.loadParcels();
  }

  loadParcels(event=true) {
    this.parcels_api.getList().subscribe(data => {
      this.parcels = data;
    })
  }

}
