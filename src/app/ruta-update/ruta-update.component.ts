import { Component, OnInit } from '@angular/core';
import { Ruta, Actividad } from '../_models';
import { RutaService, ActividadService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-ruta-update',
    templateUrl: './ruta-update.component.html',
    styleUrls: ['./ruta-update.component.css']
})

export class RutaUpdateComponent implements OnInit {

    constructor(private rutaService: RutaService, private actividadService: ActividadService, private router: Router, private route: ActivatedRoute) { }

    ruta: Ruta;
    submitted = false;
    dificultades = ['FACIL', 'MODERADO', 'DIFICIL', 'MUY_DIFICIL', 'SOLO_EXPERTOS'];
    formatos = ['SOLO_IDA', 'CIRCULAR'];
    privacidades = ['PUBLICA', 'PRIVADA'];
    actividades: Actividad[];

    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.rutaService.find(id).subscribe(
            data => {
                this.ruta = data
                var rutaDate = new Date(this.ruta.fecha);
                this.ruta.fecha = rutaDate.getFullYear() + '-' + (rutaDate.getMonth() + 1) + '-' + rutaDate.getDate()
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            })
        );
        // console.log(this.ruta)
        this.getActividades();
    }
    

    onSubmit(form) {
        this.submitted = true;
        this.rutaService.update(this.ruta, this.ruta.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Ruta modificada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['home/ruta/list']);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
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

    uploadFotos() {

    }

    uploadRecorrido() {

    }
}