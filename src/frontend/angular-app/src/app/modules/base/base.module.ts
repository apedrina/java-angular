import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
     ],
    declarations: [
        MenuComponent,
        HeaderComponent,
        FooterComponent
    ],
    exports: [
        MenuComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class BaseModule {}