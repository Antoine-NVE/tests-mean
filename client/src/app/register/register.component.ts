import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    public registerForm: FormGroup = new FormGroup({
        pseudo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        plainPassword: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'),
            Validators.maxLength(40),
        ]),
    });
    public pseudo = this.registerForm.get('pseudo');
    public email = this.registerForm.get('email');
    public plainPassword = this.registerForm.get('plainPassword');

    constructor(private userService: UserService) {}

    public onSubmit() {
        if (this.registerForm.valid) {
            // console.log('Formulaire soumis avec succès : ');
            // console.log(this.registerForm.value);

            this.userService.register(this.registerForm.value).subscribe({
                next: (response: {}) => console.log(response),
                error: (error) => console.log(error.message),
            });
        } else {
            console.log('Formulaire non valide');
        }
    }
}
