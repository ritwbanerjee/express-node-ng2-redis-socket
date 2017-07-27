import { Observable }                 from 'rxjs/Observable';
import { Injectable, EventEmitter }   from '@angular/core';
import * as io                        from 'socket.io-client';
import { WebSocketService }           from './websocket-service';

// INJECTION
@Injectable()

export class TryService {

  constructor(
    private socketService  : WebSocketService
  ) {}

  getData(uri, payload) {
    let observable = new Observable((observer) => {
      this.socketService.send(uri, payload).subscribe((response: any) => {
        observer.next(response);
      });
    });
    return observable;
  }
}