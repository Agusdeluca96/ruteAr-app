import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { User, Rol } from '../_models';
import { AuthenticationService } from '../_services';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthenticationService) { }

    user = new User('', '', '', '', '', '', '', '', '', new Rol('', ''), '');
    submitted = false;
    returnUrl: string;

    onSubmit(form) {
        this.submitted = true;
        this.authenticationService.login(this.user).subscribe(
            data => this.router.navigate(["home"]),
            error =>
                swal({
                    type: "error",
                    title: "Usuario o contraseña incorrectas",
                    text: "Por favor vuelva a intentarlo",
                    showConfirmButton: false,
                    timer: 2000
                })
        );
        form.resetForm();
    }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    public openCredenciales() {
        swal({
            title: 'Bienvenido a RutaAr!',
            text: "Cómo deseás ingresar al sistema?",
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#398a2f',
            cancelButtonColor: '#269bcc',
            confirmButtonText: 'Administrador',
            cancelButtonText: 'Usuario Básico'
        }).then(result => {
            if (result.value) {
                swal({
                    title: 'Credenciales del Administrador',
                    html: "<b>Usuario:</b> <i>admin</i> <br> <b>Contraseña:</b> <i>admin</i>",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#398a2f',
                    cancelButtonColor: '#269bcc',
                    confirmButtonText: 'Autocompletar',
                    cancelButtonText: 'Yo me encargo',
                }).then(result => {
                    if (result.value) {
                        this.user.usuario = 'admin';
                        this.user.contrasena = 'admin';
                    }
                });
            } else {
                swal({
                    title: 'Credenciales de Usuario Básico',
                    html: "<b>Usuario:</b> <i>basico</i> <br> <b>Contraseña:</b> <i>basico</i>",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#398a2f',
                    cancelButtonColor: '#269bcc',
                    confirmButtonText: 'Autocompletar',
                    cancelButtonText: 'Yo me encargo',
                }).then(result => {
                    if (result.value) {
                        this.user.usuario = 'basico';
                        this.user.contrasena = 'basico';
                    }
                });
            }
        });
    }

}