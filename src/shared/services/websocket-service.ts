/**
 * DANGER
 * DO NOT TOUCH
 */

import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class WebSocketService {

  private url: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  socket    :  any;
  

  constructor() {
    this.socket = io(this.url);
    this.socket.once('error', (err) => {
      console.log('SOCKET ERROR:', err);
    });
  }

  send(uri, payload?) {
    // Send data to NODE Layer through the socket
    this.socket.emit(uri, payload);
    // Receive data from NODE through the socket
    let observable = new Observable(observer => {
      this.socket.once(uri, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  
}