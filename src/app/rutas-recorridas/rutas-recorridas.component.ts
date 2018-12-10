import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta, User } from '../_models';
import { RutaService, UserService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-rutas-recorridas',
    templateUrl: './rutas-recorridas.component.html',
    providers: [RutaService, NgbModal],
    styleUrls: ['./rutas-recorridas.component.css']
})
export class RutasRecorridasComponent implements OnInit {
    rutas: Ruta[];
    currentUser: User;

    constructor(private modalService: NgbModal, private router: Router, private rutaService: RutaService, private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getRutas();
    }

    getRutas(): void {
        this.userService.listAllRutasRecorridas(this.currentUser).subscribe(
            data => this.rutas = data,
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
    }

    view(ruta) {
        this.router.navigate(['home/ruta/view', ruta.id])
    }

}
