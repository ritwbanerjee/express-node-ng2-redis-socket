import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule }       from '@agm/core';
import { Title }               from '@angular/platform-browser';
//COMPONENTS
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';

// ROUTING
import { CoreRoutingModule } from './core-routing.module';

import { SharedModule } from '../shared/shared.module';

import { fixedHeadDirective }  from '../shared/nav-header.directive';

@NgModule({
    imports: [
      CoreRoutingModule,
      SharedModule,
      FormsModule,
      CommonModule,
      OwlModule,
      AgmCoreModule.forRoot({apiKey : 'AIzaSyAYTUDz5WOKtbtFO7-Lgwv-H4czrAhVr-g'}),
    ],
    exports: [
      NavbarComponent,
      HomepageComponent,
      LoginComponent,
      fixedHeadDirective
    ],
    declarations: [
      NavbarComponent,
      HomepageComponent,
      LoginComponent,
      fixedHeadDirective
    ],
})
export class CoreModule { }
