import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from '../_models/actividad';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()

export class ActividadService {

    constructor(
        private http: HttpClient
    ) { }

    /** GET actividades from the server */
    listAll(): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:8080/ruteAr/actividad/listAll');
    }

    /** GET actividades from the server */
    find(id: number): Observable<Actividad> {
        return this.http.get<Actividad>('http://localhost:8080/ruteAr/actividad/' + id.toString(), httpOptions);
    }

    /** POST: add a new actividad to the database */
    add(actividad: Actividad): Observable<Actividad> {
        return this.http.post<Actividad>('http://localhost:8080/ruteAr/actividad/', actividad, httpOptions);
    }

    /** POST: add a new actividad to the database */
    update(actividad: Actividad, id: number): Observable<Actividad> {
        return this.http.put<Actividad>('http://localhost:8080/ruteAr/actividad/' + id.toString(), actividad, httpOptions);
    }

    /** DELETE: delete actividad with the ID sended in the URL from the database */
    delete(id: number): Observable<{}> {
        return this.http.delete('http://localhost:8080/ruteAr/actividad/' + id.toString(), httpOptions);
    }

}
