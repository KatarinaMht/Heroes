import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { loginValidator } from './../../validators/login.validator';


@Component({
    moduleId: module.id,
    selector: 'esl-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    
    constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
        this.createForm();
    }

    ngOnInit() { }

    login() {
        this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then(
            user => { 
                    console.log("User = " + user.username);
                    this.router.navigate(['/proposals-page/proposals']);
                },
            reason => { console.log("ERROR: " + reason); }
        );
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: [ '', Validators.required ],
            password: [ '', Validators.required ]
        },
        {
            validator: loginValidator
        });
    }
} 