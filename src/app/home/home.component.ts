import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadCurrentUser();
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.listAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    private loadCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}