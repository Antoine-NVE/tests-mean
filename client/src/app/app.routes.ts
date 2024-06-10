import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { connectedGuard } from './guards/connected/connected.guard';

export const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [connectedGuard] },
    { path: 'connexion', component: LoginComponent },
    { path: 'inscription', component: RegisterComponent },
    { path: 'deconnexion', component: LogoutComponent },
];
