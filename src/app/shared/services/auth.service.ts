import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

// Employee, TeamLeader, Manager
// class User {
//     role:string = '';
// }

@Injectable()
export class AuthService {

    private user: User;
    userList: User[];

    constructor(){
        this.userList = USERS;
    }

    getUser(): User {
        return this.user;
    }

    login(username:string, password:string): Promise<User> {
        //this.user.role = 'Manager';
        //this.user.role = 'TeamLeader';
        console.log("Usao u login servis: " + username + " " + password);

        for (let user of this.userList) {
            if (user.password == password && user.username == username) {
                this.user = _.cloneDeep(user);
                return Promise.resolve(this.user);
            }
        }

        return null; //Promise.reject("Wrong username or password.");
    }

    logout(): void {
        this.user = null;
    }
    
}