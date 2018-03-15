import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ParticlesModule } from 'angular-particle';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(`${environment.apiUrl}/api`);
  RestangularProvider.setRequestSuffix('/');
  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
    var newResponse;
    if (operation === "getList") {
      newResponse = response.results;
      newResponse.count = response.count;
      newResponse.next = response.next;
      newResponse.previous = response.previous;
    } else {
      newResponse = response;
    }
    return newResponse;
  });
}


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RestangularModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ParticlesModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
