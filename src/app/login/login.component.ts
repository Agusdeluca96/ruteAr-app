import { Component, OnInit } from '@angular/core';
import { User, Rol } from '../_models';
import { UserService } from '../_services';
import { AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from "@angular/router";
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
        private userService: UserService,
        private authenticationService: AuthenticationService) { }

    user = new User('', '', '', '', '', '', '', '', '', new Rol('', ''), '');
    submitted = false;
    returnUrl: string;

    onSubmit(form) {
        this.submitted = true;
        this.userService.login(this.user).subscribe(
            data => this.router.navigate(['home']),
            error => swal({
                type: 'error',
                title: 'Usuario o contraseña incorrectas',
                text: 'Por favor vuelva a intentarlo',
                showConfirmButton: false,
                timer: 2000
            }));
        form.resetForm();
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

}