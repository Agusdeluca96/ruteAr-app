import { Component, OnInit } from '@angular/core';
import { Ruta, Actividad } from '../_models';
import { RutaService, ActividadService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-ruta-new',
    templateUrl: './ruta-new.component.html',
    styleUrls: ['./ruta-new.component.css']
})
export class RutaNewComponent implements OnInit {

    constructor(private rutaService: RutaService, private actividadService: ActividadService, private router: Router) { }

    ruta = new Ruta('', '', '', '', '', '', '', '', '', '', '', '', '', '');
    submitted = false;
    dificultades = ['FACIL', 'MODERADO', 'DIFICIL', 'MUY_DIFICIL', 'SOLO_EXPERTOS'];
    formatos = ['SOLO_IDA', 'CIRCULAR'];
    privacidades = ['PUBLICA', 'PRIVADA'];
    actividades: Actividad[];

    onSubmit(form) {
        console.log(this.ruta.actividad);
        this.submitted = true;
        this.rutaService.add(this.ruta).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Ruta agregada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['home/ruta/list']);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                text: 'Por favor vuelva a internarlo mas tarde.',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
    }

    ngOnInit() {
        this.getActividades();
    }

    getActividades(): void {
        this.actividadService.listAll().subscribe(
            data => this.actividades = data,
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                text: 'Por favor, vuelva a intentarlo mas tarde.',
                showConfirmButton: false,
                timer: 2000
            })
        );
    }

    get diagnostic() { return JSON.stringify(this.ruta); }

}
