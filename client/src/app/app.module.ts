import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { ParticlesModule } from 'angular-particle';
import { HttpClientModule } from '@angular/common/http';
import { LeadService } from './lead.service'
import { AuthService } from './auth/auth.service';
import { PropertyService } from "./property.service";

// Material
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { ButtonComponent } from './button/button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeadComponent } from './lead/lead.component';
import { PropertyComponent } from './property/property.component';

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl(`${environment.apiUrl}/api`);
  RestangularProvider.setRequestSuffix('/');
  RestangularProvider.setDefaultHeaders({});
  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
    let newResponse;
    if (operation === "getList") {
      if (response.results) {
        newResponse = response.results;
        newResponse.count = response.count;
        newResponse.next = response.next;
        newResponse.previous = response.previous;
      }
    } else {
      newResponse = response;
    }
    return newResponse;
  });
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    DashboardComponent,
    LeadComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RestangularModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ParticlesModule,
    PerfectScrollbarModule,
    MatDividerModule,

    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LeadService,
    PropertyService,
    AuthService,
    Restangular
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
