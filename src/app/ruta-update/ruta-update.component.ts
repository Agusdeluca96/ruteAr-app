import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Ruta, Actividad } from '../_models';
import { RutaService, ActividadService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
import { faFileImage, faTrash, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-ruta-update',
    templateUrl: './ruta-update.component.html',
    styleUrls: ['./ruta-update.component.css']
})

export class RutaUpdateComponent implements OnInit {

    constructor(private rutaService: RutaService, private actividadService: ActividadService, private router: Router, private _location: Location, 
        private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

    ruta: Ruta;
    submitted = false;
    dificultades = ['FACIL', 'MODERADO', 'DIFICIL', 'MUY_DIFICIL', 'SOLO_EXPERTOS'];
    formatos = ['SOLO_IDA', 'CIRCULAR'];
    privacidades = ['PUBLICA', 'PRIVADA'];
    actividades: Actividad[];
    fotos: Array<File> = [];
    recorrido: File = null;
    validFotoExtension = ['jpg', 'jpeg', 'png']
    faFileImage = faFileImage;
    faTrash = faTrash;
    faFile = faFile;
    errorModificacionRuta = false;

    ngOnInit() {
        let id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.rutaService.find(id).subscribe(
            data => {
                this.ruta = data;
                var rutaDate = new Date(this.ruta.fecha);
                this.ruta.fecha = rutaDate.getFullYear() + '-' + ('0' + (rutaDate.getMonth() + 1)).slice(-2) + '-' + ('0' + rutaDate.getDate()).slice(-2);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            })
        );
        this.getActividades();
    }
    

    onSubmit(form) {
        this.submitted = true;
        // this.ruta.actividad = new Actividad(this.ruta.actividad);
        this.rutaService.update(this.ruta, this.ruta.id).subscribe(
            data => {
                this.fotos.forEach(foto => {
                    if (!this.errorModificacionRuta) {
                        this.rutaService.addFoto(foto, this.ruta.id).subscribe(
                            data => { },
                            error => {
                                this.errorModificacionRuta = true;
                            }
                        );
                    }
                });
                if (!this.errorModificacionRuta) {
                    this.rutaService.addRecorrido(this.recorrido, this.ruta.id).subscribe(
                        data => { },
                        error => {
                            this.errorModificacionRuta = true;
                        }
                    );
                }
                if (!this.errorModificacionRuta) {
                    swal({
                        type: 'success',
                        title: 'Ruta modificada con exito!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then((result) => window.location.href = (environment.url + 'home/ruta/view/' + this.ruta.id));
                } else {
                    swal({
                        type: 'error',
                        title: 'Ha ocurrido un error!',
                        text: 'Alguna de las modificaciones realizadas no se ha podido realizar.',
                        showConfirmButton: false,
                        timer: 2500
                    });

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
            });
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

    getUrlFoto(foto) {
        return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + foto);
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
            html: "No se subirá al crear la ruta.",
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

    deleteFotoRuta(indexFoto) {
        swal({
            title: 'Confirma el borrado del archivo?',
            html: "Esta acción no se podrá deshacer.",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#398a2f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then(result => {
            if (result.value) {
                this.rutaService.deleteFoto(this.ruta.id, indexFoto).subscribe(
                    data => {
                        swal({
                            type: 'success',
                            title: 'Foto eliminada!',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.ruta.fotos.splice(indexFoto, 1);
                    },
                    error => swal({
                        type: 'error',
                        title: 'Ha ocurrido un error!',
                        text: 'No ha sido posible eliminar la foto solicitada.',
                        showConfirmButton: false,
                        timer: 5000
                    })
                )
            }
        });
    }

    uploadRecorrido(event) {
        let recorridoSubido = event.target.files[0];
        if (recorridoSubido.name.split('.').pop() == 'kml') {
            swal({
                title: 'Confirma subida del nuevo recorrido?',
                html: "Este recorrido reemplazará al recorrido actual de la ruta.",
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#398a2f',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            }).then(result => {
                if (result.value) {
                    this.recorrido = recorridoSubido;
                }
            });
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
            html: "No se reemplazara por el actual al modificar la ruta.",
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

    goBack() {
        this._location.back();
    }
}