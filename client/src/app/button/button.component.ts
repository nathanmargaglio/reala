import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LeadService} from "../lead.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  address: string = '';

  constructor(private leadService: LeadService) { }

  @Output()
  reloadLeads = new EventEmitter();

  ngOnInit() {

  }

  onSubmit(){
    this.leadService.postLead(this.address).subscribe(data => {
        console.log(data);
        this.reloadLeads.emit();
      })
  }

}
