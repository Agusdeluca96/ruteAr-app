import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    listAll(): Observable<Actividad[]> {
        return this.http.get<Actividad[]>('http://localhost:8080/ruteAr/actividad/listAll');
    }

    /** POST: add a new actividad to the database */
    add(actividad: Actividad): Observable<Actividad> {
        return this.http.post<Actividad>('http://localhost:8080/ruteAr/actividad/', actividad, httpOptions);
    }

    /** DELETE: delete actividad with the ID sended in the URL from the database */
    delete(id: number): Observable<{}> {
        return this.http.delete('http://localhost:8080/ruteAr/actividad/' + id.toString(), httpOptions);
    }

    /** Error Handler */ 
    /** 
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            return throwError('Ha ocurrido un error con los datos ingresados. Por favor vuelva a intentarlo.');
            // console.error('An error occurred:', error.error.message);
        } else {
            return throwError('Ha ocurrido un error en el servidor. Por favor vuelva a intentarlo.');
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            // console.error(
            //     `Backend returned code ${error.status}, ` +
            //     `body was: ${error.error}`);
        }
    }
    */
}
