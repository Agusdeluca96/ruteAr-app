import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { User } from '../model/user';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()

export class UserService {
    constructor(
        private http: HttpClient
    ) {}
    /** GET users from the server */
    listAll (): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:8080/ruteAr/usuario/listAll');
    }

    /** POST: add a new user to the database */
    add (user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/ruteAr/usuario/', user, httpOptions);
    }

    /** PUT: modify attr 'habilitado' from false to true of an user in the database */
    habilitar (user: User): Observable<User> {
        const url = 'http://localhost:8080/ruteAr/usuario/'.concat(user.id.toString(), '/habilitar');
        return this.http.put<User>(url, httpOptions);
    }

    /** PUT: modify attr 'habilitado' from true to false of an user in the database */
    deshabilitar (user: User): Observable<User> {
        const url = 'http://localhost:8080/ruteAr/usuario/'.concat(user.id.toString(), '/deshabilitar');
        return this.http.put<User>(url, httpOptions);
    }
}
