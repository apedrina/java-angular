import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardhComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BaseModule} from '../../base/base.module';

@NgModule({
  imports: [
    BaseModule,
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    DashboardhComponent
  ],
  declarations: [
    DashboardhComponent,
    
  ],
  providers: [
  ],
})
export class DashboardModule { }
