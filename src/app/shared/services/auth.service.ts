import { ConfigurationsService } from './configuration/configuration.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

@Injectable()
export class AuthService {

    static user: User;
    userList: User[];
    url: string;
    constructor(private http: Http, private conf: ConfigurationsService) {
        console.log("I am new one!");
        
        this.url = this.conf.getApiEndpoint('login');
        //and check if user it's just logged
        let tmpuser = JSON.parse(window.localStorage.getItem('user'));
        if (tmpuser) {
            
            AuthService.user = new User();
            AuthService.user.username=tmpuser.username;
            AuthService.user.password=tmpuser.password;
            AuthService.user.id=tmpuser.id;
            AuthService.user.email=tmpuser.email;
            AuthService.user.roles=tmpuser.roles;
            //here user just logged so navigate to main page
            //TODO
        }
    }

    getUser(): User {
        console.log("get user");
        return AuthService.user;
    }

    login(username: string, password: string): Promise<any> {

        return this.http.post(this.url, { "username": username, "password": password }).toPromise().then(response => {
            
            let user=response.text();

            console.log('login', user);
            localStorage.setItem('userToken',JSON.stringify(user));
            
            var base64Url = user.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            let obj:any= JSON.parse(window.atob(base64));
        user=JSON.parse(obj.sub);
            localStorage.setItem('user',JSON.stringify(user));
             AuthService.user = new User();
            AuthService.user.username=user.username;
            AuthService.user.password=user.password;
            AuthService.user.id=user.id;
            AuthService.user.email=user.email;
            AuthService.user.roles=user.roles;
            return  AuthService.user;
        }

        );


    }

    logout(): void {
        AuthService.user = null;
        window.localStorage.clear();
    }

}