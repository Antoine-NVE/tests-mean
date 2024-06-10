import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const connectedGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!token) {
        router.navigate(['/connexion']);

        return false;
    }

    return authService.authenticated({ token: token }).pipe(
        map((response) => {
            console.log(response);

            return true;
        }),
        catchError((error) => {
            console.log(error);

            router.navigate(['/connexion']);
            return of(false);
        })
    );
};
