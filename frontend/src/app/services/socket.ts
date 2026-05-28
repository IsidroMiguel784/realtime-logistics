import { Injectable } from '@angular/core';

import { io, Socket } from 'socket.io-client';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  private socket: Socket;

  constructor() {

    this.socket = io('http://localhost:3000');

  }

  listen(eventName: string): Observable<any> {

    return new Observable((subscriber) => {

      const handler = (data: any) => {

        subscriber.next(data);

      };

      this.socket.on(eventName, handler);

      return () => {

        this.socket.off(eventName, handler);

      };

    });

  }

}