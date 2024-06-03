import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        pseudo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        email: new FormControl(''),
        plainPassword: new FormControl(''),
    });

    public onSubmit() {
        console.log(this.registerForm.get('pseudo')?.errors);

        console.log(this.registerForm.value);
        if (this.registerForm.valid) {
            console.log('Formulaire soumis avec succès : ');
            console.log(this.registerForm.value);
        } else {
            console.log('Formulaire non valide');
        }
    }
}
