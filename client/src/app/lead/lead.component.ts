import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {LeadService} from "../lead.service";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  Object = Object;
  @Input() leadData: object;
  @Output() loadProperty: EventEmitter<number> = new EventEmitter();

  constructor(public leadService: LeadService) { }

  ngOnInit() {
  }

  purchaseLeadDetails(id) {
    //this.leadService.purchaseLeadDetails(id);
  }

  emitProperty(){
    this.loadProperty.emit(this.leadData['properties']);
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
