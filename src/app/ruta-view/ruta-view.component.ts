/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment'
import { Ruta } from '../_models';
import { RutaService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';

@Component({
    selector: 'app-ruta-view',
    templateUrl: './ruta-view.component.html',
    styleUrls: ['./ruta-view.component.css']
})

export class RutaViewComponent implements OnInit {

    constructor(private rutaService: RutaService, private router: Router, private route: ActivatedRoute, private _location: Location, private sanitizer: DomSanitizer) { }

    ruta: Ruta;

    @ViewChild('gmap') gmapElement: any;
    map: google.maps.KmlLayer;


    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.rutaService.find(id).subscribe(
            data => {
                this.ruta = data;
                var rutaDate = new Date(this.ruta.fecha);
                this.ruta.fecha = rutaDate.getDate() + '/' + (rutaDate.getMonth() + 1) + '/' + rutaDate.getFullYear();
                this.renderKmlMap(id);
            },
            error => console.log(error));
    }

    update() {
        this.router.navigate(['home/ruta/update', this.ruta.id])
    }

    delete() {
        swal({
            title: 'Estas seguro?',
            text: "No vas a poder revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#398a2f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.rutaService.delete(this.ruta.id).subscribe(
                    data => {
                        swal({
                            type: 'success',
                            title: 'Ruta eliminada!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this._location.back();
                    },
                    error => swal({
                        type: 'error',
                        title: 'Ha ocurrido un error!',
                        text: 'No es posible elimina rutas que hayan sido transitadas, valoradas o anotadas por otros usuarios',
                        showConfirmButton: false,
                        timer: 5000
                    })
                )
            }
        });
    }

    categoryClass(category) {
        if (category === "ALERTA") {
            return 'badge-danger';
        } else if (category === "DENUNCIA") {
            return 'badge-warning';
        } else {
            return 'badge-success';
        }
    }

    renderKmlMap(id) {
        let maps = new google.maps.Map(this.gmapElement.nativeElement);

        this.map = new google.maps.KmlLayer({
            url: environment.api_url + 'ruta/' + id + '/kml',
            map: maps
        });
    }

    getUrlFoto(foto) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + foto);
    }


}