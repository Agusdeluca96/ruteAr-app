import { Component, OnInit } from '@angular/core';
import { Actividad } from '../_models';
import { ActividadService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
	selector: 'app-actividad-new',
	templateUrl: './actividad-new.component.html',
	styleUrls: ['./actividad-new.component.css']
})

export class ActividadNewComponent implements OnInit {

	constructor(private actividadService: ActividadService, private router: Router) { }

	msjExito = '';
	actividad = new Actividad('', '', '');
	submitted = false;

	onSubmit(form) {
		this.submitted = true;
		this.actividadService.add(this.actividad).subscribe(
			data => {
				swal({
					type: 'success',
					title: 'Actividad agregada con exito!',
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

	ngOnInit() {
	}

}