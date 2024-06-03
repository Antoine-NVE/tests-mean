import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'inscription', component: RegisterComponent },
];
