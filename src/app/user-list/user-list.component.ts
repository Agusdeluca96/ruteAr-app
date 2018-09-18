import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../_models';
import { UserService } from '../_services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: [ UserService, NgbModal],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];
    userDetail: User;

    constructor(private modalService: NgbModal, private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.listAll().subscribe(
            data => this.users = data,
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            }));
    }

    habilitar(user) {
        this.userService.habilitar(user).subscribe(
            data => user.habilitado = data.habilitado, 
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            })
        );
    }

    deshabilitar(user) {
        this.userService.deshabilitar(user).subscribe(
            data => user.habilitado = data.habilitado, 
            error => swal({
                type: 'error',
                title: 'Ha ocurrido un error!',
                showConfirmButton: false,
                timer: 2000
            })
        );
    }

    open(content, user) {
        this.userDetail = user;
        this.modalService.open(content, { centered: true });
    }
}
