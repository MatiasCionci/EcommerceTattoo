import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentoriaplanes',
  imports: [MenuComponent, CommonModule],
  templateUrl: './mentoriaplanes.html',
  styleUrl: './mentoriaplanes.css'
})
export class Mentoriaplanes {

}
