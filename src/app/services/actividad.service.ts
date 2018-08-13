import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { Actividad } from '../model/actividad';

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
    ) {}

    /** GET actividades from the server */
    getActividades (): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:8080/ruteAr/actividad/listAll');
    }

    /** POST: add a new actividad to the database */
    addActividad(actividad: Actividad): Observable<Actividad> {
        return this.http.post<Actividad>('http://localhost:8080/ruteAr/actividad/', actividad, httpOptions);
    }
}
