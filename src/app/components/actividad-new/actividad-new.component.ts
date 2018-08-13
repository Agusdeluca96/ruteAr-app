import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../model/actividad';
import { FormsModule } from '@angular/forms';
import { ActividadService } from '../../services/actividad.service';

@Component({
	selector: 'app-actividad-new',
	templateUrl: './actividad-new.component.html',
	styleUrls: ['./actividad-new.component.css']
})

export class ActividadNewComponent implements OnInit {

	constructor(private actividadService: ActividadService) { }

	msjExito = '';
	actividad = new Actividad('', '', '');
	submitted = false;

	onSubmit(form) {
		console.log('hola');
		this.submitted = true;
		this.actividadService.addActividad(this.actividad).subscribe();
		form.resetForm();
		this.msjExito = "La operación se ha realizado con exito.";
	}

	ngOnInit() {
	}

}