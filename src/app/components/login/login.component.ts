import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private userService: UserService, private router: Router) { }

    user = new User('', '', '', '', '', '', '', '', '', '');
    submitted = false;

    onSubmit(form) {
        this.submitted = true;
        this.userService.login(this.user).subscribe(
            data => this.router.navigate(['home/user']),
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
