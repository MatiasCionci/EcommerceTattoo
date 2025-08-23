import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
@Component({
  selector: 'app-videosexplicativos',
  imports: [MenuComponent, CommonModule],
  templateUrl: './videosexplicativos.html',
  styleUrl: './videosexplicativos.css'
})
export class Videosexplicativos {
  isLoggedIn = true; // Cambia esto por tu lógica real de login
  userEmail = 'usuario@email.com'; // Reemplaza por tu lógica real

  accederVideo(tipo: string) {
    // Aquí va la lógica para mostrar el video o redirigir
    console.log('Acceso a video:', tipo);
    // Ejemplo: abrir modal, navegar, etc.
  }
}
