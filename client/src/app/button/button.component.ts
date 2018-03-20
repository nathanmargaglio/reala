import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output()
  reloadParcels = new EventEmitter<boolean>();

  ngOnInit() {
    this.parcels_api = this.restangular.all('leads');
    this.parcels_api.getList().subscribe(data => {
      this.parcels = data;
    })
  }

  onSubmit(){
    //let data = {"address": this.address};
    //this.parcels_api.post(data).subscribe(d => {
    //  this.reloadParcels.emit(true);
    //});

    this.reloadParcels.emit(true);
  }

}
