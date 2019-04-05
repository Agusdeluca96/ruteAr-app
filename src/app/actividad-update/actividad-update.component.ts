import { Component, OnInit } from '@angular/core';
import { Actividad } from '../_models';
import { ActividadService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-actividad-update',
    templateUrl: './actividad-update.component.html',
    styleUrls: ['./actividad-update.component.css']
})

export class ActividadUpdateComponent implements OnInit {

    constructor(private actividadService: ActividadService, private router: Router, private route: ActivatedRoute) { }

    msjExito = '';
    actividad: Actividad;
    submitted = false;

    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.actividadService.find(id).subscribe(
            data => this.actividad = data,
            error => error);
    }

    onSubmit(form) {
        this.submitted = true;
        this.actividadService.update(this.actividad, this.actividad.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Actividad modificada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['home/actividad/list']);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
    }

}