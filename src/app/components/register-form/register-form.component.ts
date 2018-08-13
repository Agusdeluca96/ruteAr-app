import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-register-form',
	templateUrl: './register-form.component.html',
	styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

	constructor(private userService: UserService) { }

	msjExito = '';
	user = new User('','','','','','','','','', '');
	submitted = false;
	sexos = ['MASCULINO', 'FEMENINO', 'OTRO'];

	onSubmit(form) {
		this.submitted = true;
		this.userService.addUser(this.user).subscribe();
		form.resetForm();
		this.msjExito = "La operación se ha realizado con exito.";
	}

	ngOnInit() {
	}

}
