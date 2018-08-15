import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

	constructor(private userService: UserService, private router: Router) { }

	user = new User('','','','','','','','','', '');
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
				this.router.navigate(['home/user']);
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
