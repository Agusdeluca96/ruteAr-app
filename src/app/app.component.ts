import { Component } from '@angular/core';
import { AuthenticationService } from "./_services";
import { User } from './_models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public authenticationService: AuthenticationService) { }

    public get currentUser(): User {
        return this.authenticationService.currentUser();
    }

}
