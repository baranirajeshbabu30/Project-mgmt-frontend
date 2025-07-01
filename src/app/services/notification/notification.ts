// src/app/services/notifications/notification.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Notification {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }

  onProjectEvent(): Observable<any> {
    return new Observable(observer => {
      const handler = (data: any) => {
        console.log('📥 projectEvent received:', data);
         console.log('📥 Received in observable:', data);
        observer.next(data);
      };

      this.socket.on('projectEvent', handler);

      // Cleanup on unsubscribe
      return () => this.socket.off('projectEvent', handler);
    });
  }
}
