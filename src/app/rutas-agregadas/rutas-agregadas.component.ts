import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta, User, Nota } from '../_models';
import { RutaService, UserService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-rutas-agregadas',
    templateUrl: './rutas-agregadas.component.html',
    providers: [RutaService, NgbModal],
    styleUrls: ['./rutas-agregadas.component.css']
})
export class RutasAgregadasComponent implements OnInit {
    rutas: Ruta[];
    currentUser: User;
    rutaNota: Ruta;
    categoriasNota = ['ALERTA', 'DENUNCIA', 'OPINION'];
    nota: Nota = new Nota('', '', '', new User());
    modalNotaReference: any;
    faStar = faStar;

    constructor(private modalService: NgbModal, private router: Router, private rutaService: RutaService, private userService: UserService) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.getRutas();
    }

    getRutas(): void {
        this.userService.listAllRutasAgregadas(this.currentUser).subscribe(
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
        this.rutaNota = ruta;
        this.modalNotaReference = this.modalService.open(content, { centered: true });
    }


    onNotaFormSubmit(notaForm) {
        this.nota.autor.id = this.currentUser.id;
        this.rutaService.addNota(this.nota, this.rutaNota.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Nota agregada con exito!',
                    text: 'Podras visualizar esta y el resto de las notas de la ruta en su detalle',
                    showConfirmButton: false,
                    timer: 2500
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

}
