import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
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
        return this.http.get<Actividad[]>(environment.api_url + 'actividad/listAll');
    }

    /** GET actividades from the server */
    find(id: number): Observable<Actividad> {
        return this.http.get<Actividad>(environment.api_url + 'actividad/' + id.toString(), httpOptions);
    }

    /** POST: add a new actividad to the database */
    add(actividad: Actividad): Observable<Actividad> {
        return this.http.post<Actividad>(environment.api_url + 'actividad/', actividad, httpOptions);
    }

    /** POST: add a new actividad to the database */
    update(actividad: Actividad, id: number): Observable<Actividad> {
        return this.http.put<Actividad>(environment.api_url + 'actividad/' + id.toString(), actividad, httpOptions);
    }

    /** DELETE: delete actividad with the ID sended in the URL from the database */
    delete(id: number): Observable<{}> {
        return this.http.delete(environment.api_url + 'actividad/' + id.toString(), httpOptions);
    }

}
