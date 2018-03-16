import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  address: string = '';
  parcels_api;
  parcels;
  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.parcels_api = this.restangular.all('parcels');
    this.loadParcels();
  }

  loadParcels(event=true) {
    this.parcels_api.getList().subscribe(data => {
      this.parcels = data;
    })
  }

}
