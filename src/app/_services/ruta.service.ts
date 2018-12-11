import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ruta, Nota, Calificacion } from '../_models';

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

    /** GET Ruta from the server */
    find(id: number): Observable<Ruta> {
        return this.http.get<Ruta>('http://localhost:8080/ruteAr/ruta/' + id.toString(), httpOptions);
    }

    /** POST: update a Ruta from the database */
    update(ruta: Ruta, id: number): Observable<Ruta> {
        return this.http.put<Ruta>('http://localhost:8080/ruteAr/ruta/' + id.toString(), ruta, httpOptions);
    }

    /** DELETE: delete Ruta from the database */
    delete(id: number): Observable<{}> {
        return this.http.delete('http://localhost:8080/ruteAr/ruta/' + id.toString(), httpOptions);
    }

    /** POST: add a new Nota to Ruta from the database */
    addNota(nota: Nota, id: number): Observable<Nota> {
        return this.http.post<Nota>('http://localhost:8080/ruteAr/ruta/' + id.toString() + '/nota', nota, httpOptions);
    }

    /** POST: add a new Calificacion to Ruta from the database */
    addCalificacion(calificacion: Calificacion, id: number): Observable<Calificacion> {
        return this.http.post<Calificacion>('http://localhost:8080/ruteAr/ruta/' + id.toString() + '/calificacion', calificacion, httpOptions);
    }
}
