import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mentoriaplanes',
  imports: [MenuComponent, CommonModule],
  templateUrl: './mentoriaplanes.html',
  styleUrl: './mentoriaplanes.css'
})
export class Mentoriaplanes {
  showModal = false;
  constructor(private http: HttpClient) {}

  pagarConMercadoPago() {
    this.http.post<any>('http://localhost:5274/api/pagos/crear-preferencia', {})
      .subscribe({
        next: async (res) => {
          if (res.preferenceId) {
            this.showModal = true;
            setTimeout(async () => {
              const { loadMercadoPago } = await import('@mercadopago/sdk-js');
              await loadMercadoPago();
              const mp = new (window as any).MercadoPago('TEST-5d1362fe-9eb3-4e5e-8af3-310fc14064e9', { locale: 'es-AR' });
              const bricksBuilder = mp.bricks();
              await bricksBuilder.create('wallet', 'wallet_modal_container', {
                initialization: { preferenceId: res.preferenceId }
              });
            }, 100);
          }
        },
        error: () => {
          alert('Error al iniciar el pago');
        }
      });
  }
  cerrarModal() {
    this.showModal = false;
  }

}
