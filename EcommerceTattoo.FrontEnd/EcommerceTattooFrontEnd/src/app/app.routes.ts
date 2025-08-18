import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './component/page/home/home-component/home-component';
import { MenuComponent } from './component/menu/menu-component/menu-component';
import { RegisterComponent } from './features/register.component';
import { ReservarCita } from './component/page/home/reservar-cita/reservar-cita';
import { Manejarimagenes } from './component/page/home/manejarimagenes/manejarimagenes';
export const routes: Routes = [
 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'reservar-cita', component: ReservarCita},
    { path: 'manejador-imagenes', component: Manejarimagenes}
];
