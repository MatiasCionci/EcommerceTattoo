import { Component} from '@angular/core';
import { MenuComponent } from '../../component/menu/menu-component/menu-component';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 constructor(private router: Router, private authService: AuthService) {}
   email = '';
  password = '';
  error = '';

 goToRegister() {
   this.router.navigate(['/register']);
 }
 login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        // Guarda el token si lo necesitas
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']); // Redirige a home o donde quieras
      },
      error: (err) => {
        this.error = err.error || 'Credenciales inválidas';
      }
    });
  }
}
