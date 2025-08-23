import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5274/notificationHub')
      .build();
  }

  public startConnection(): void {
    this.connection
      .start()
      .then(() => console.log('Conectado a SignalR'))
      .catch(err => console.error('Error de conexión:', err));
  }

  public onMessage(callback: (msg: any) => void): void {
    this.connection.on('ReceiveMessage', callback);
  }
}
