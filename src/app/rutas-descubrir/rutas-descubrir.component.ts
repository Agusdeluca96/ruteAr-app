import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta, User, Nota, Actividad } from '../_models';
import { RutaService, UserService, ActividadService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { faStar, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-rutas-descubrir',
    templateUrl: './rutas-descubrir.component.html',
    providers: [RutaService, UserService, NgbModal],
    styleUrls: ['./rutas-descubrir.component.css']
})
export class RutasDescubrirComponent implements OnInit {
   
    constructor(private modalService: NgbModal, private router: Router, private rutaService: RutaService, private userService: UserService, 
        private actividadService: ActividadService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    rutas: Ruta[];
    rutasRecorridas: Ruta[];
    actividades: Actividad[];
    currentUser: User;
    rutaNota: Ruta;
    dificultades = ['FACIL', 'MODERADO', 'DIFICIL', 'MUY_DIFICIL', 'SOLO_EXPERTOS'];
    formatos = ['SOLO_IDA', 'CIRCULAR'];
    categoriasNota = ['ALERTA', 'DENUNCIA', 'OPINION'];
    nota: Nota = new Nota('', '', '', new User());
    modalNotaReference: any;
    faStar = faStar;
    faArrowsAltV = faArrowsAltV;
    filtroActividad = '';
    filtroFormato = '';
    filtroDificultad = '';

    ngOnInit() {
        this.getActividades();
        this.getRutas();
    }

    getRutas(): void {
        this.userService.listAllRutasDescubrir(this.currentUser, this.filtroActividad, this.filtroFormato, this.filtroDificultad).subscribe(
            data => {
                this.rutas = data;
                this.rutas.forEach(ruta => {
                    this.userService.isKnownRoute(ruta.id, this.currentUser.id).subscribe(
                        data => ruta.isRecorrida = data,
                        error => {}
                    );
                });
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
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

    view(ruta) {
        this.router.navigate(['home/ruta/view', ruta.id])
    }

    addKnownRoute(ruta) {
        this.userService.addKnownRoute(ruta, this.currentUser.id).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'Ruta agregada con exito!',
                    text: 'Ahora vas a poder visualizarla en el listado de rutas recorridas.',
                    showConfirmButton: false,
                    timer: 2500
                });
                this.getRutas();
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

    changeFiltroActividad(id) {
        this.filtroActividad = id;
    }
    
    changeFiltroFormato(formato) {
        this.filtroFormato = formato;
    }

    changeFiltroDificultad(dificultad) {
        this.filtroDificultad = dificultad;
    }
}

