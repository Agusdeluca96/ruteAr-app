import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: [ UserService, NgbModal],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    closeResult: string;
    users: User[];
    userDetail: User;

    constructor(private modalService: NgbModal, private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    habilitar(user) {
        this.userService.habilitarUser(user).subscribe(userResponse => user.habilitado = userResponse.habilitado);
        console.log(user);
    }

    deshabilitar(user) {
        this.userService.deshabilitarUser(user).subscribe(userResponse => user.habilitado = userResponse.habilitado);
        console.log(user);
    }

    open(content, user) {
        this.userDetail = user;
        this.modalService.open(content, { centered: true });
    }
}
