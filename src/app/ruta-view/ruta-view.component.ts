import { Component, OnInit } from '@angular/core';
import { Ruta } from '../_models';
import { RutaService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-ruta-view',
    templateUrl: './ruta-view.component.html',
    styleUrls: ['./ruta-view.component.css']
})

export class RutaViewComponent implements OnInit {

    constructor(private rutaService: RutaService, private router: Router, private route: ActivatedRoute, private _location: Location) { }

    // ruta: Ruta;
    ruta = new Ruta('', 'Iruya', 'Nos alojamos en lo de Jasinta. Es una pieza limpia, con camas que tienen sabanas y cobijas limpias, nos alimentaron muy bien y son muy amables. La casa esta al lado de una construccion de techo verde. No lo aconsejo para personas con escasa actividad fisica ya que, partes del recorrido son muy exigentes. No tiene desperdicio las vistas desde San Juan a Iruya.', 'Privada', '', 'Solo ida', '12', 'Moderado', '2', '20/10/2016', '', '', '', 'Senderismo');

    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.rutaService.find(id).subscribe(
            data => {
                this.ruta = data;
                var rutaDate = new Date(this.ruta.fecha);
                this.ruta.fecha = rutaDate.getDate() + '/' + (rutaDate.getMonth() + 1) + '/' + rutaDate.getFullYear();
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


}