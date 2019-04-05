import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
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
        return this.http.get<Ruta[]>(environment.api_url + 'ruta/listAll');
    }

    /** POST: add a new ruta to the database */
    add(ruta: Ruta): Observable<Ruta> {
        return this.http.post<Ruta>(environment.api_url + 'ruta', ruta, httpOptions);
    }

    /** GET Ruta from the server */
    find(id: number): Observable<Ruta> {
        return this.http.get<Ruta>(environment.api_url + 'ruta/' + id.toString(), httpOptions);
    }

    /** POST: update a Ruta to the database */
    update(ruta: Ruta, id: number): Observable<Ruta> {
        return this.http.put<Ruta>(environment.api_url + 'ruta/' + id.toString(), ruta, httpOptions);
    }

    /** DELETE: delete Ruta from the database */
    delete(id: number): Observable<{}> {
        return this.http.delete(environment.api_url + 'ruta/' + id.toString(), httpOptions);
    }

    /** POST: add a new Nota to Ruta to the database */
    addNota(nota: Nota, id: number): Observable<Nota> {
        return this.http.post<Nota>(environment.api_url + 'ruta/' + id.toString() + '/nota', nota, httpOptions);
    }

    /** POST: add a new Foto to Ruta to the database */
    addFoto(foto: File, id: number): Observable<File> {
        let httpOptionsMulti = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data'
            })
        };
        return this.http.post<File>(environment.api_url + 'ruta/' + id.toString() + '/foto', foto, httpOptionsMulti);
    }

    /** DELETE: delete Ruta from the database */
    deleteFoto(id: number, indexFoto: number): Observable<{}> {
        return this.http.delete(environment.api_url + 'ruta/' + id.toString() + '/foto/' + indexFoto.toString(), httpOptions);
    }

    /** POST: add a new Recorrido to Ruta to the database */
    addRecorrido(kml: File, id: number): Observable<File> {
        let httpOptionsMulti = {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data'
            })
        };
        return this.http.post<File>(environment.api_url + 'ruta/' + id.toString() + '/kml', kml, httpOptionsMulti);
    }

    /** POST: add a new Calificacion to Ruta to the database */
    addCalificacion(calificacion: Calificacion, id: number): Observable<Calificacion> {
        return this.http.post<Calificacion>(environment.api_url + 'ruta/' + id.toString() + '/calificacion', calificacion, httpOptions);
    }

}
