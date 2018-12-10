import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta, User, Note } from '../_models';
import { RutaService, UserService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-rutas-agregadas',
    templateUrl: './rutas-agregadas.component.html',
    providers: [RutaService, NgbModal],
    styleUrls: ['./rutas-agregadas.component.css']
})
export class RutasAgregadasComponent implements OnInit {
    rutas: Ruta[];
    currentUser: User;
    rutaNote: Ruta;
    categoriasNote = ['ALERTA', 'DENUNCIA', 'OPINION'];
    note: Note = new Note('', '', '', new User());
    modalNoteReference: any;

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

    modalNote(content, ruta) {
        this.rutaNote = ruta;
        this.modalNoteReference = this.modalService.open(content, { centered: true });
    }


    onNoteFormSubmit(noteForm) {
        this.note.autor.id = this.currentUser.id;
        this.rutaService.addNote(this.note, this.rutaNote.id).subscribe(
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
        noteForm.resetForm();
        this.modalNoteReference.close();
    }

}
