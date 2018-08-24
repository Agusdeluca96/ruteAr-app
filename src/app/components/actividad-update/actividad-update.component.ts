import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../model/actividad';
import { ActividadService } from '../../services/actividad.service';
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
    actividad = new Actividad('', '', '');
    submitted = false;

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
                this.router.navigate(['home/admin/actividad/list']);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
    }

    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.actividadService.find(id).subscribe(
            data => this.actividad = data,
            error => console.log(error));
    }

}