import {Component, Input, OnInit} from '@angular/core';
import {LeadService} from "../lead.service";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

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

  constructor(public leadService: LeadService) { }

  ngOnInit() {
  }

  purchaseLeadDetails(id) {
    this.leadService.purchaseLeadDetails(id);
  }

  loadLeadDetails(id) {
    let promise = this.leadService.getLeadDetails(id);

    if (promise) {
      promise.subscribe(data => {
        console.log(data);
        this.leadData = data;

        if (this.leadData.estated) {
          this.propertyData = this.leadData.estated.property;
          console.log(this.propertyData);

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
