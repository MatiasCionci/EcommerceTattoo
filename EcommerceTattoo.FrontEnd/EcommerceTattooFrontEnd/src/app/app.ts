import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EcommerceTattooFrontEnd');
   constructor(public router: Router) {}

  isLogin = computed(() => this.router.url === '/login');
}
