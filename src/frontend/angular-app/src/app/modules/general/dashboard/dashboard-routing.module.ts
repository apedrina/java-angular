import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardhComponent} from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardhComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
