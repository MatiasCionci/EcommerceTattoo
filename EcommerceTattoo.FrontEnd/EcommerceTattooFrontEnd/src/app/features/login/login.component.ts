import { Component } from '@angular/core';
import { MenuComponent } from '../../component/menu/menu-component/menu-component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private router: Router) {}

 goToRegister() {
   this.router.navigate(['/register']);
 }
}
