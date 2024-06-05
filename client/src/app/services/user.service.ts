import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private url = 'http://localhost:3000/api/user/';

    constructor(private http: HttpClient) {}

    public register(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.url, user).pipe(catchError(this.handleError));
    }

    // Gestion d'erreurs
    private handleError(error: HttpErrorResponse) {
        let errorMessage: string;
        if (error.status === 0) {
            // Erreur de connexion
            errorMessage = 'Une erreur de connexion est survenue, veuillez réessayer plus tard';
        } else {
            // Erreur de validation
            errorMessage = `Une erreur ${error.status} est survenue : ${error.error.message}`;
        }

        return throwError(() => errorMessage);
    }
}
