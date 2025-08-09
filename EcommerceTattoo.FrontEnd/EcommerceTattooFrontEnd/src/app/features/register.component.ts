import { Component } from '@angular/core';
import { MenuComponent } from '../component/menu/menu-component/menu-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [MenuComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

