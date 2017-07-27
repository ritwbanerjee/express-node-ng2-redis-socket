import { Observable }                 from 'rxjs/Observable';
import { Injectable, EventEmitter }   from '@angular/core';
import * as io                        from 'socket.io-client';
import { WebSocketService }           from './websocket-service';

// INJECTION
@Injectable()

export class UserService {

  private loginApi       = 'api:login';
  private logoutApi      = 'api:logout';
  private isLoggedInApi  = 'api:isLoggedIn';

  constructor(
    private socketService  : WebSocketService
  ) {}

  login(payload) {
    let observable = new Observable((observer) => {
      this.socketService.send(this.loginApi, payload).subscribe((response: any) => {
        observer.next(response);
      });
    });
    return observable;
  }

  logout() {
    let observable = new Observable((observer) => {
      this.socketService.send(this.logoutApi).subscribe((response: any) => {
        observer.next(response);
      });
    })
  }

  isLoggedIn() {
    let observable = new Observable((observer) => {
      this.socketService.send(this.isLoggedInApi).subscribe((response: any) => {
        observer.next(response);
      });
    });

    return observable;
  }
}