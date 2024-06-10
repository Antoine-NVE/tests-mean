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
        // localStorage.removeItem('token');
        localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY0MGI4MWQ0OGU1ZDVmMjlhMGZlMTAiLCJpYXQiOjE3MTgwMTA4NzYsImV4cCI6MTcxODA5NzI3Nn0.KFKTxgXeGKq5aF_p0KPQW4Z3xUhD_tPkdNOUo16RYh'
        );

        // On redirige vers la page de connexion
        this.router.navigate(['/connexion']);
    }
}
