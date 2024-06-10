import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
    // Formulaire
    public loginForm: FormGroup = new FormGroup({
        identifier: new FormControl('', Validators.required),
        plainPassword: new FormControl('', Validators.required),
    });

    // Inputs du formulaire
    public identifier = this.loginForm.get('identifier');
    public plainPassword = this.loginForm.get('plainPassword');

    // Envoie des informations à l'utilisateur
    public isLoading: boolean = false;
    public errorMessage: string = '';

    // Détecte tout changement de n'importe quel input, et supprime le message d'erreur
    public loginFormChangesSubscription: Subscription = this.loginForm.valueChanges.subscribe(() => {
        this.errorMessage = '';
    });

    constructor(private authService: AuthService, private router: Router) {}

    public onSubmit(): void {
        this.isLoading = true;

        this.authService.login(this.loginForm.value).subscribe({
            next: (response: { message: string; token: string }) => {
                // On stocke le JWT
                localStorage.setItem('token', response.token);

                // On redirige
                this.router.navigate(['/']);
            },
            error: (error) => {
                // On indique que ce n'est plus en chargement et on affiche l'erreur
                this.isLoading = false;
                this.errorMessage = error;
            },
        });
    }

    ngOnDestroy(): void {
        this.loginFormChangesSubscription.unsubscribe();
    }
}
