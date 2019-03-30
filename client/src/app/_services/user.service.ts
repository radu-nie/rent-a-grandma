import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../_models';
import { Globals } from '../../globals';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private globals: Globals) { }

    getAll(): Observable<any> {
        return this.http.get<User[]>(this.globals.serverUrl + `users`);
    }

    getById(id: number): Observable<any> {
        return this.http.get(this.globals.serverUrl + `users/` + id);
    }

    register(user: User): Observable<any> {
        return this.http.post(this.globals.serverUrl + `users/register`, user);
    }

    update(user: User): Observable<any> {
        return this.http.put(this.globals.serverUrl + `api/users/` + user.id, user);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(this.globals.serverUrl + `api/users/` + id);
    }
}