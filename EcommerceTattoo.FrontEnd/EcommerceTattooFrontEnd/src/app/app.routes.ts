import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './component/page/home/home-component/home-component';
import { MenuComponent } from './component/menu/menu-component/menu-component';
import { RegisterComponent } from './features/register.component';


export const routes: Routes = [
 
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
];
