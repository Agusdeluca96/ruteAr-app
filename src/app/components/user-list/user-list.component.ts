import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  providers: [ UserService ],
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[];
    editUser: User;

    constructor(private userService: UserService) { }

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

    // add(name: string): void {
    //     this.editUser = undefined; name = name.trim();
    //
    //     if (!name) {
    //         return;
    //     }
    //
    //     // The server will generate the id for this new hero
    //     const newUser: User = { name } as User; this.usersService.addUser(newUser).subscribe(hero => this.users.push(hero));
    // }
}
