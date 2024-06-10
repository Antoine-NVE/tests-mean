import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-logout',
    standalone: true,
    imports: [],
    templateUrl: './logout.component.html',
    styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        // On supprime le token
        localStorage.removeItem('token');

        // On redirige vers la page de connexion
        this.router.navigate(['/connexion']);
    }
}
