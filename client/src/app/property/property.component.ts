import {Component, Input, OnInit} from '@angular/core';
import {PropertyService} from "../property.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  Object = Object;
  rawData;
  propertyData;
  disablePurchaseButton: boolean;
  address: string;
  id: number;

  constructor(public propertyService: PropertyService) { }

  ngOnInit() {
    this.disablePurchaseButton = false;
  }

  onSubmit() {
    console.log(this.address);
    this.propertyService.update_data(this.id,
      {formatted_address: this.address}).subscribe(res => {
      this.loadPropertyDetails(this.id)
    });
  }

  purchasePropertyDetails() {
    this.disablePurchaseButton = true;
    this.propertyService.purchasePropertyDetails(this.id).subscribe(res => {
      console.log(res);
      this.disablePurchaseButton = false;
      this.loadPropertyDetails(this.id);
    })
  }

  loadPropertyDetails(id) {
    this.id = id;
    let promise = this.propertyService.getPropertyDetails(id);

    if (promise) {
      promise.subscribe(data => {
        console.log(data);
        this.rawData = data;
        this.address = data.formatted_address;

        if (this.rawData && this.rawData.data) {
          this.propertyData = this.rawData.data.property
        } else {
          this.propertyData = null;
        }

      });
    } else {
      console.log("Need to log in");
    }
  }

  isObject(val) { return typeof val === 'object'; }


}
