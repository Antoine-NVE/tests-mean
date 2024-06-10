import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
    // Formulaire
    public registerForm: FormGroup = new FormGroup({
        pseudo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        plainPassword: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'),
            Validators.maxLength(40),
        ]),
    });

    // Inputs du formulaire
    public pseudo = this.registerForm.get('pseudo');
    public email = this.registerForm.get('email');
    public plainPassword = this.registerForm.get('plainPassword');

    // Envoie des informations à l'utilisateur
    public isLoading: boolean = false;
    public errorMessage: string = '';

    // Détecte tout changement de n'importe quel input, et supprime le message d'erreur
    public registerFormChangesSubscription: Subscription = this.registerForm.valueChanges.subscribe(() => {
        this.errorMessage = '';
    });

    constructor(private authService: AuthService, private router: Router) {}

    public onSubmit(): void {
        this.isLoading = true;

        this.authService.register(this.registerForm.value).subscribe({
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
        // Arrête la détection des changements des inputs
        this.registerFormChangesSubscription.unsubscribe();
    }
}
