import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../../../models/User';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = 'http://localhost:3000/api/user/';

    constructor(private http: HttpClient) {}

    public register(user: { pseudo: string; email: string; plainPassword: string }): Observable<{ message: string; token: string }> {
        return this.http.post<{ message: string; token: string }>(this.url + 'register', user).pipe(catchError(this.handleError));
    }

    public login(user: { identifier: string; plainPassword: string }): Observable<{ message: string; token: string }> {
        return this.http.post<{ message: string; token: string }>(this.url + 'login', user).pipe(catchError(this.handleError));
    }

    public authenticated(token: { token: string }): Observable<{ message: string; authenticated: boolean }> {
        return this.http.post<{ message: string; authenticated: boolean }>(this.url + 'authenticated', token).pipe(catchError(this.handleError));
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
