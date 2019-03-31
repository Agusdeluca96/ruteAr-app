import { Component, OnInit } from '@angular/core';
import { Ruta, Actividad, User } from '../_models';
import { RutaService, ActividadService } from '../_services';
import { Router, ChildActivationStart } from "@angular/router";
import swal from 'sweetalert2';
import { faFileImage, faTrash, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-ruta-new',
    templateUrl: './ruta-new.component.html',
    styleUrls: ['./ruta-new.component.css']
})
export class RutaNewComponent implements OnInit {

    constructor(private rutaService: RutaService, private actividadService: ActividadService, private router: Router) { }

    ruta = new Ruta('', '', '', '', '', '', '', '', '', '', '', '', [], [], [], new Actividad(), new User());
    submitted = false;
    dificultades = ['FACIL', 'MODERADO', 'DIFICIL', 'MUY_DIFICIL', 'SOLO_EXPERTOS'];
    formatos = ['SOLO_IDA', 'CIRCULAR'];
    privacidades = ['PUBLICA', 'PRIVADA'];
    actividades: Actividad[];
    currentUser: User = JSON.parse(localStorage.getItem('currentUser'));  
    fotos: Array<File> = [];
    recorrido: File = null;
    validFotoExtension = ['jpg', 'jpeg', 'png']
    faFileImage = faFileImage;
    faTrash = faTrash;
    faFile = faFile;
    errorCreacionRuta = false;

    ngOnInit() {
        this.getActividades();
    }

    onSubmit(form) {
        this.submitted = true;
        this.ruta.creador = this.currentUser;
        this.ruta.actividad = new Actividad(this.ruta.actividad);
        this.rutaService.add(this.ruta).subscribe(
            data => {
                this.ruta = data;
                this.fotos.forEach(foto => {
                    if (!this.errorCreacionRuta) {
                        this.rutaService.addFoto(foto, this.ruta.id).subscribe(
                            data => {},
                            error => {
                                this.errorCreacionRuta = true;
                            }
                        );
                    }
                });
                if (!this.errorCreacionRuta) {
                    this.rutaService.addRecorrido(this.recorrido, this.ruta.id).subscribe(
                        data => {},
                        error => {
                            this.errorCreacionRuta = true;
                        }
                    );
                }
                if (!this.errorCreacionRuta) {
                    swal({
                        type: 'success',
                        title: 'Ruta agregada con exito!',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    this.router.navigate(['home/ruta/view', this.ruta.id])
                } else {
                    this.rutaService.delete(this.ruta.id).subscribe();
                }
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
        form.resetForm();
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

    uploadFoto(event) {
        let foto = event.target.files[0];
        if (this.checkValidFotoExtension(foto)) {
            this.fotos.push(foto);
        } else {
            swal({
                type: 'error',
                title: 'Error al cargar imagen',
                text: 'Recordá que solo se admiten imagenes con formato JPG, JPEG y PNG.',
                showConfirmButton: false,
                timer: 2500
            })
        }
    }

    checkValidFotoExtension(foto) {
        let extension = foto.name.split('.').pop();
        return this.validFotoExtension.includes(extension);
    }

    deleteFoto(foto) {
        swal({
            title: 'Confirma el borrado del archivo: ' + foto.name + '?',
            html: "No se subirá al crear la ruta",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#398a2f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.value) {
                let index = this.fotos.indexOf(foto);
                this.fotos.splice(index, 1);
            }
        });
    }

    uploadRecorrido(event) {
        let recorridoSubido = event.target.files[0];
        if (recorridoSubido.name.split('.').pop() == 'kml') {
            this.recorrido = recorridoSubido;
        } else {
            swal({
                type: 'error',
                title: 'Error al cargar recorrido',
                text: 'Recordá que solo se admiten archivos con formato KML.',
                showConfirmButton: false,
                timer: 2500
            })
        }
    }

    deleteRecorrido(foto) {
        swal({
            title: 'Confirma el borrado del archivo: ' + foto.name + '?',
            html: "No se subirá al crear la ruta",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#398a2f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.value) {
                this.recorrido = null;
            }
        });
    }
}
