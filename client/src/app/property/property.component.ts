import {Component, Input, OnInit} from '@angular/core';
import {PropertyService} from "../property.service";

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @Input() id: number;

  Object = Object;
  leadData;
  propertyData;
  addressData;
  boundariesData;
  comparablesData;
  metaData;
  mortgagesData;
  ownersData;
  postalData;
  salesData;
  siteData;
  statusData;
  structuresData;
  taxesData;
  valuationData;

  constructor(public propertyService: PropertyService) { }

  ngOnInit() {
  }

  purchasePropertyDetails(id) {
    this.propertyService.purchasePropertyDetails(id);
  }

  loadPropertyDetails(id) {
    let promise = this.propertyService.getPropertyDetails(id);

    if (promise) {
      promise.subscribe(data => {
        this.leadData = data;

        if (this.leadData.data && this.leadData.data.property) {
          this.propertyData = this.leadData.data.property;

          this.addressData = this.propertyData.address;
          this.boundariesData = this.propertyData.boundaries;
          this.comparablesData = this.propertyData.comparables;
          this.metaData = this.propertyData.metadata;
          this.mortgagesData = this.propertyData.mortgages;
          this.ownersData = this.propertyData.owners;
          this.postalData = this.propertyData.postal;
          this.salesData = this.propertyData.sales;
          this.siteData = this.propertyData.site;
          this.statusData = this.propertyData.status;
          this.structuresData = this.propertyData.structures;
          this.taxesData = this.propertyData.taxes;
          this.valuationData = this.propertyData.valuation;
        } else {
          this.propertyData = null;
        }

      });
    } else {
      console.log("Need to log in");
    }
  }

}
