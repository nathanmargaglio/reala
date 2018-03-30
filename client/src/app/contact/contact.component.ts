import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  name: string;
  address: string;
  id: number;
  disablePurchaseButton: boolean;

  @Output()
  reloadLeads = new EventEmitter();

  constructor(public contactService: ContactService) { }

  ngOnInit() {
    this.disablePurchaseButton = false;
  }

  onSubmit() {
    console.log(this.address, this.name);
    this.contactService.update_data(this.id,
      {raw_name: this.name, raw_address: this.address}).subscribe(res => {
      this.loadContactDetails(this.id);
    });
  }

  purchaseContactDetails() {
    this.disablePurchaseButton = true;
    this.contactService.purchaseContactDetails(this.id).subscribe(res => {
      this.disablePurchaseButton = false;
      this.loadContactDetails(this.id);
    })
  }

  loadContactDetails(id) {
    this.id = id;
    let promise = this.contactService.getContactDetails(id);

    if (promise) {
      promise.subscribe(data => {
        this.rawData = data;
        this.name = data.raw_name;
        this.address = data.raw_address;

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

  isObject(val) { return typeof val === 'object'; }

}
