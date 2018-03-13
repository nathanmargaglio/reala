import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  value = 0;
  constructor(private restangular: Restangular) { }

  ngOnInit() {
    this.value = 0;

    let res = this.restangular.all('parcels');
    res.getList().subscribe(d => {
      console.log(d)
    });
  }

  bChange(d) {
    console.log(d.source.checked);
    this.value++;
    console.log("!!");
  }

}
