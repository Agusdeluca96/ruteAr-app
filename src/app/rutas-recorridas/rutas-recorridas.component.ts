import { Calificacion } from './../_models/calificacion';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta, User, Nota } from '../_models';
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
    rutaModal: Ruta;
    nota: Nota = new Nota('', '', '', new User());
    categoriasNota = ['ALERTA', 'DENUNCIA', 'OPINION'];
    modalNotaReference: any;
    calificacion: Calificacion = new Calificacion('', '', new User());
    valoresCalificacion = ['1 - Muy mala', '2 - Mala', '3 - Regular', '4 - Buena', '5 - Excelente'];
    modalCalificacionReference: any;

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

    openModalNota(content, ruta) {
        this.rutaModal = ruta;
        this.modalNotaReference = this.modalService.open(content, { centered: true });
    }

    onNotaFormSubmit(notaForm) {
        this.nota.autor.id = this.currentUser.id;
        this.rutaService.addNota(this.nota, this.rutaModal.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Nota agregada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            error => {
                swal({
                    type: 'error',
                    title: 'Ha ocurrido un error!',
                    text: 'Por favor vuelva a internarlo mas tarde.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        );
        notaForm.resetForm();
        this.modalNotaReference.close();
    }

    openModalCalificacion(content, ruta) {
        this.rutaModal = ruta;
        this.modalCalificacionReference = this.modalService.open(content, { centered: true });
    }

    onCalificacionFormSubmit(calificacionForm) {
        this.calificacion.usuario.id = this.currentUser.id;
        this.rutaService.addCalificacion(this.calificacion, this.rutaModal.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Calificacion agregada con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
            },
            error => {
                swal({
                    type: 'error',
                    title: 'Ha ocurrido un error!',
                    text: 'Por favor vuelva a internarlo mas tarde.',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        );
        calificacionForm.resetForm();
        this.modalCalificacionReference.close();
    }



}
