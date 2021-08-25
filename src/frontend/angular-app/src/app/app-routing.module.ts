import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './modules/general/not-found/not-found.component';
import {AuthGuard} from './_helpers';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', canActivate: [AuthGuard],
    loadChildren: () => import('./modules/general/dashboard/dashboard.module')
      .then(mod => mod.DashboardModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/general/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'import', canActivate: [AuthGuard],
    loadChildren: () => import('./modules/general/import/import.module')
      .then(mod => mod.ImportModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
