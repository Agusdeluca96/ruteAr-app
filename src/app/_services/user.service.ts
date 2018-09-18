import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

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
    ) { }
    /** GET users from the server */
    listAll(): Observable<User[]> {
        return this.http.get<User[]>('http://localhost:8080/ruteAr/usuario/listAll');
    }

    /** POST: add a new user to the database */
    add(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/ruteAr/usuario/', user, httpOptions);
    }

    /** POST: check in the database an user with the username and password passed in the login form */
    login(user: User): Observable<User> {
        return this.http.post<User>('http://localhost:8080/ruteAr/usuario/login', user, httpOptions).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    }

    /** PUT: modify attr 'habilitado' from false to true of an user in the database */
    habilitar(user: User): Observable<User> {
        const url = 'http://localhost:8080/ruteAr/usuario/'.concat(user.id.toString(), '/habilitar');
        return this.http.put<User>(url, httpOptions);
    }

    /** PUT: modify attr 'habilitado' from true to false of an user in the database */
    deshabilitar(user: User): Observable<User> {
        const url = 'http://localhost:8080/ruteAr/usuario/'.concat(user.id.toString(), '/deshabilitar');
        return this.http.put<User>(url, httpOptions);
    }
}
