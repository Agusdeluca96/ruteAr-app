import { Component, OnInit } from '@angular/core';
import { User, Rol } from '../_models';
import { UserService } from '../_services';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) { }

    user = new User('', '', '', '', '', '', '', '', '', new Rol('', 'Usuario Basico'), '');
    submitted = false;
    sexos = ['MASCULINO', 'FEMENINO', 'OTRO'];

    onSubmit(form) {
        this.submitted = true;
        this.userService.add(this.user).subscribe(
            data => {
                swal({
                    type: 'success',
                    title: 'La operación se ha realizado con exito!',
                    showConfirmButton: false,
                    timer: 2000
                });
                this.router.navigate(['login']);
            },
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
    }

    ngOnInit() {
    }

}