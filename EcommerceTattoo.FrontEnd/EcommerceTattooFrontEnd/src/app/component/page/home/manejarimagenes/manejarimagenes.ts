import { AfterViewInit,Component, OnInit } from '@angular/core';
import { SignalRService } from '../../../../core/signalr/signalr.service';
declare var $: any;
import { Router, NavigationEnd } from '@angular/router';
import { ImagesService } from '../../../../core/images/images.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu-component/menu-component';


@Component({
  selector: 'app-manejarimagenes',
  imports: [MenuComponent,CommonModule],
  templateUrl: './manejarimagenes.html',
  styleUrl: './manejarimagenes.css'
})
export class Manejarimagenes implements OnInit {
  images: any[] = [];
  poptroxError: string = '';
  modalOpen: boolean = false;
  selectedIndex: number = 0;

  constructor(private imagesService: ImagesService, private router: Router, private signalRService: SignalRService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadImages();
      }
    });
    // Iniciar conexión SignalR y escuchar mensajes
    this.signalRService.startConnection();
    this.signalRService.onMessage((msg) => {
      // Aquí puedes manejar el mensaje recibido, por ejemplo recargar imágenes
      console.log('Mensaje SignalR recibido:', msg);
      this.loadImages();
    });
  }

  ngOnInit() {
    this.loadImages();
  }

  // Ejemplo de proceso asíncrono (puedes reemplazarlo por el real)
  miProcesoAsync(): Promise<void> {
    return new Promise(resolve => {
      // Simula un proceso que tarda 1 segundo
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  openModal(index: number) {
    this.selectedIndex = index;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  prevImage() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  nextImage() {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
    }
  }

  loadImages() {
    this.imagesService.getImagesByFolder('neotraditional').subscribe({
      next: (data) => {
        this.images = data;
      },
      error: () => this.images = []
    });
  }
}