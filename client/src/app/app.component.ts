import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  particlesStyle: object = {};
  particlesParams: object = {};
  particlesWidth: number = 100;
  particlesHeight: number = 100;
  particlesInit: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/assets/particles/particlesjs-config-default.json').subscribe(data => {
      this.particlesParams = data;
      this.particlesInit = true;
    });

    this.particlesStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background-color': '#54b8ff'
    };
  }
}
