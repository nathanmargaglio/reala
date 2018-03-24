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
  @Input() formatted_address: string;

  constructor(public leadService: LeadService) { }

  ngOnInit() {
  }

  purchaseLeadDetails(id) {
    this.leadService.purchaseLeadDetails(id);
  }

  loadProperties(){
    console.log("!");
  }

  loadLeadDetails(id) {
    let promise = this.leadService.getLeadDetails(id);

    if (promise) {
      promise.subscribe(data => {
        console.log(data);
        this.leadData = data;
      });
    } else {
      console.log("Need to log in");
    }
  }

}
