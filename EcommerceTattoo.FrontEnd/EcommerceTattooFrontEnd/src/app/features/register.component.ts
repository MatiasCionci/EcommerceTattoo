import { Component } from '@angular/core';
import { MenuComponent } from '../component/menu/menu-component/menu-component';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  success = '';

  constructor(private router: Router, private authService: AuthService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        this.success = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.error = '';
        setTimeout(() => this.goToLogin(), 1500);
      },
      error: (err) => {
        this.error = err.error || 'Error al registrar usuario';
        this.success = '';
      }
    });
  }
}

