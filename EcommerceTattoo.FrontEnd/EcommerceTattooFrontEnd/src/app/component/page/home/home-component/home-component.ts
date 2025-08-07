import { Component } from '@angular/core';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
@Component({
  selector: 'app-home-component',
  imports: [MenuComponent],
  standalone: true,
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}
