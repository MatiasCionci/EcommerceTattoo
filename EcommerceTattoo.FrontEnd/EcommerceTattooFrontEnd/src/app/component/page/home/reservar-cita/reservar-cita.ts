import { Component } from '@angular/core';
import { AppointmentService, AppointmentRequest } from '../../../../core/appointment/appointment.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../menu/menu-component/menu-component';
@Component({
  selector: 'app-reservar-cita',
   standalone: true,
  imports: [CommonModule, FormsModule, MenuComponent],
  templateUrl: './reservar-cita.html',
  styleUrl: './reservar-cita.css'
})
export class ReservarCita {
  successMsg = '';
  errorMsg = '';
  snackbarMsg = '';
  snackbarType: 'success' | 'error' | '' = '';

  constructor(private appointmentService: AppointmentService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form['email'] as HTMLInputElement).value.trim();
    const phone = (form['phone'] as HTMLInputElement).value.trim();
    const idea = (form['idea'] as HTMLInputElement).value.trim();
    const date = (form['date'] as HTMLInputElement).value.trim();
    const turno = (form['turno'] as HTMLSelectElement).value.trim();

    if (!email || !phone || !idea || !date || !turno) {
      this.showSnackbar('Todos los campos son obligatorios.', 'error');
      return;
    }

    const data: AppointmentRequest = { email, phone, idea, date, turno };
    this.successMsg = '';
    this.errorMsg = '';
    this.snackbarMsg = '';
    this.snackbarType = '';
    this.appointmentService.sendAppointment(data).subscribe({
      next: () => {
        this.successMsg = '¡Cita enviada correctamente!';
        this.showSnackbar(this.successMsg, 'success');
        form.reset();
      },
      error: () => {
        this.errorMsg = 'Error al enviar la cita. Intenta nuevamente.';
        this.showSnackbar(this.errorMsg, 'error');
      }
    });
  }

  showSnackbar(message: string, type: 'success' | 'error') {
    this.snackbarMsg = message;
    this.snackbarType = type;
    setTimeout(() => {
      this.snackbarMsg = '';
      this.snackbarType = '';
    }, 3500);
  }
}
