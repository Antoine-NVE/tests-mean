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

    public register(user: User) {
        return this.http.post(this.url, user).pipe(catchError(this.handleError));
    }

    // Gestion d'erreurs
    private handleError(error: HttpErrorResponse) {
        let errorMessage: string;
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            // console.error('An error occurred:', error.error);
            errorMessage = `An error occurred: ${error.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            // console.error(`Backend returned code ${error.status}, body was: `, error.error);
            errorMessage = `Backend returned code ${error.status}, body was: ${error.error.message}`;
            console.log(error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.' + '\n' + errorMessage));
    }
}
