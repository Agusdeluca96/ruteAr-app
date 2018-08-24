import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../model/actividad';
import { ActividadService } from '../../services/actividad.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styleUrls: ['./actividad-list.component.css']
})
export class ActividadListComponent implements OnInit {

    actividades: Actividad[];
    actividadDetail: Actividad;

    constructor(private actividadService: ActividadService, private router: Router) { }

    ngOnInit() {
        this.getActividades();
    }

    getActividades(): void {
        this.actividadService.listAll().subscribe(
            data => this.actividades = data, 
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            })
        );
    }

    delete(actividad) {
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
                this.actividadService.delete(actividad.id).subscribe(
                    data => {
                        swal({
                            type: 'success',
                            title: 'Actividad eliminada!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.getActividades();
                    },
                    error => swal({
                        type: 'error',
                        title: 'Ha ocurrido un error!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                )
            }
        });
    }
    
    update(actividad) {
        this.router.navigate(['home/admin/actividad/update', actividad.id])
    }
}
