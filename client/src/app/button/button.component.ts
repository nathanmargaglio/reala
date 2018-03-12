import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  value = 0;
  constructor() { }

  ngOnInit() {
    this.value = 0;
  }

  bChange(d) {
    console.log(d.source.checked);
    this.value++;
  }

}
