import {Component, Input, OnInit} from '@angular/core';
import {ContactService} from "../contact.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  Object = Object;
  rawData: any;
  contactData: any;

  constructor(public contactService: ContactService) { }

  ngOnInit() {
  }

  loadContactDetails(id) {
    let promise = this.contactService.getContactDetails(id);

    if (promise) {
      promise.subscribe(data => {
        this.rawData = data;

        if (this.rawData && this.rawData.data) {
          this.contactData = this.rawData.data
        } else {
          this.contactData = null;
        }
        
      });
    } else {
      console.log("Need to log in");
    }
  }

}
