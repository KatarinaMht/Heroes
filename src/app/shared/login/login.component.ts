import { Component, OnInit } from '@angular/core';

import { AuthService }  from '../services/auth.service'; 

@Component({
    moduleId: module.id,
    selector: 'esl-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    userCredentials: any = {};
    
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    login() {
        this.authService.login(this.userCredentials.username, this.userCredentials.password);
    }
}