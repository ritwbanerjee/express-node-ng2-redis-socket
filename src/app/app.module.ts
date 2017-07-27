import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { HttpModule }          from '@angular/http';


import { AppComponent }        from './app.component';

// Import all services
import { WebSocketService }    from '../shared/services/websocket-service';
import { UserService }         from '../shared/services/user-service';

import { appRouting }          from './app.routing.module';


@NgModule({
  imports: [
    BrowserModule,
    appRouting,
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    UserService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }