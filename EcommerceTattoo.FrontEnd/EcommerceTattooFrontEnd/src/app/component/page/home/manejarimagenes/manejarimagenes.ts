import { AfterViewInit,Component, OnInit } from '@angular/core';
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

  constructor(private imagesService: ImagesService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadImages();
      }
    });
  }

  ngOnInit() {
    this.loadImages();
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
