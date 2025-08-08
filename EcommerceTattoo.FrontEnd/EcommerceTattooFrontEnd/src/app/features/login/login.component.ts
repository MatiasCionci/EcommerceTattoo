import { Component } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu-component/menu-component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
