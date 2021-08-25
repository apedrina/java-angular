import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BaseModule} from './modules/base/base.module';
import {NotFoundComponent} from './modules/general/not-found/not-found.component';
import {authInterceptorProviders} from './_helpers';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  exports: [
  ],
  imports: [
    BaseModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [authInterceptorProviders],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
