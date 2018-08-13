import { Component, OnInit } from '@angular/core';
import { Actividad } from '../../model/actividad';
import { ActividadService } from '../../services/actividad.service';

@Component({
  selector: 'app-actividad-list',
  templateUrl: './actividad-list.component.html',
  styleUrls: ['./actividad-list.component.css']
})
export class ActividadListComponent implements OnInit {

    actividades: Actividad[];
    actividadDetail: Actividad;

    constructor(private actividadService: ActividadService) { }

    ngOnInit() {
        this.getActividades();
        console.log(this.actividades);
    }

    getActividades(): void {
        this.actividadService.getActividades().subscribe(actividades => this.actividades = actividades);
    }

    // open(content, user) {
    //     this.userDetail = user;
    //     this.modalService.open(content, { centered: true });
    // }
}
