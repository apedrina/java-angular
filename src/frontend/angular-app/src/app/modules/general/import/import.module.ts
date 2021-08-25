import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImportComponent} from './import.component';
import {ImportRoutingModule} from './import-routing.module';
import {BaseModule} from '../../base/base.module';
import {AlertModule} from '../../application/ui-core/alerts/alert.module';

@NgModule({
  imports: [
    AlertModule,
    CommonModule,
    ImportRoutingModule,
    BaseModule
  ],
  exports: [
    ImportComponent
  ],
  declarations: [
    ImportComponent
  ],
  providers: [
  ],
})
export class ImportModule { }
