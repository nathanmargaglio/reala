import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  address: string = '';
  parcels_api;
  parcels;
  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.parcels_api = this.restangular.all('parcels');
    this.parcels_api.getList().subscribe(data => {
      this.parcels = data;
    })
  }

  onSubmit(){
    console.log(this.address);
    let data = {"address": this.address};
    this.parcels_api.post(data).subscribe(d => {
      this.parcels_api.getList().subscribe(data => {
        this.parcels = data;
      })
    });
  }

}
