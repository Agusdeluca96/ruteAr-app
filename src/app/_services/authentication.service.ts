import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models';

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "my-auth-token"
    })
};

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    /** POST: check in the database an user with the username and password passed in the login form */
    login(user: User): Observable<User> {
        return this.http.post<User>(environment.api_url + "usuario/login", user, httpOptions).pipe(
            map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem("currentUser", JSON.stringify(user));
                }
                return user;
            })
        );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
    }

    currentUser() {
        return JSON.parse(localStorage.getItem("currentUser"));
    }
}