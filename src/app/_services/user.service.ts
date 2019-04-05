import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { User, Ruta } from '../_models';

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
        return this.http.get<User[]>(environment.api_url + 'usuario/listAll');
    }

    /** POST: add a new user to the database */
    add(user: User): Observable<User> {
        return this.http.post<User>(environment.api_url + 'usuario/', user, httpOptions);
    }

    /** PUT: modify attr 'habilitado' from false to true of an user in the database */
    habilitar(user: User): Observable<User> {
        const url = environment.api_url + 'usuario/' + user.id.toString() + '/habilitar';
        return this.http.put<User>(url, httpOptions);
    }

    /** PUT: modify attr 'habilitado' from true to false of an user in the database */
    deshabilitar(user: User): Observable<User> {
        const url = environment.api_url + 'usuario/' + user.id.toString() + '/deshabilitar';
        return this.http.put<User>(url, httpOptions);
    }

    /** GET Rutas Agregadas by the User from the database */
    listAllRutasAgregadas(user: User): Observable<Ruta[]> {
        return this.http.get<Ruta[]>(environment.api_url + 'usuario/' + user.id.toString() + '/rutasAgregadas');
    }

    /** GET Rutas Recorridas by the User from the database */
    listAllRutasRecorridas(user: User): Observable<Ruta[]> {
        return this.http.get<Ruta[]>(environment.api_url + 'usuario/' + user.id.toString() + '/rutasRecorridas');
    }

    /** GET Rutas Descubrir by the User from the database */
    listAllRutasDescubrir(user: User, actividad: string, formato: string, dificultad: string): Observable<Ruta[]> {
        let params = new HttpParams();
        if (actividad != '') {
            params = params.set('actividad', actividad);
        }
        if (formato != '') {
            params = params.set('formato', formato);
        }
        if (dificultad != '') {
            params = params.set('dificultad', dificultad);
        }
        return this.http.get<Ruta[]>(environment.api_url + 'usuario/' + user.id.toString() + '/rutasDescubrir', { params: params });
    }

    /** POST: add a new ruta to User known routes to the database */
    addKnownRoute(ruta: Ruta, id: number): Observable<Ruta> {
        return this.http.post<Ruta>(environment.api_url + 'usuario/' + id.toString() + '/recorrerRuta', ruta, httpOptions);
    }

    /** GET:  */
    isKnownRoute(idRuta: number, id: number): Observable<Boolean> {
        return this.http.get<Boolean>(environment.api_url + 'usuario/' + id.toString() + '/isRecorrida/' + idRuta.toString());
    }
}
