import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Globals } from '../..//globals';
@Injectable()
export class AuthenticationService {
    serverUrl: string;
    constructor(private http: HttpClient, private globals: Globals) {
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(this.globals.serverUrl + `users/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}