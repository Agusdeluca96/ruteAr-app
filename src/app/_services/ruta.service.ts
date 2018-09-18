import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta } from '../_models/ruta';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()

export class RutaService {
    constructor(
        private http: HttpClient
    ) { }
    /** GET Rutas from the server */
    listAll(): Observable<Ruta[]> {
        return this.http.get<Ruta[]>('http://localhost:8080/ruteAr/ruta/listAll');
    }

    /** POST: add a new Ruta to the database */
    add(ruta: Ruta): Observable<Ruta> {
        return this.http.post<Ruta>('http://localhost:8080/ruteAr/ruta/', ruta, httpOptions);
    }
}
