import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
@Component({
  selector: 'app-reservar-cita',
   standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.css'
})
export class ReservarCita {

}
