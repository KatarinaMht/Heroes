import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { User } from '../../../shared/models/user.model';

@Injectable()
export class UserConverter {

    convertUserToModel(usr: any): User {

        let user = new User();
        user.id = usr.id;
        user.firstName = usr.firstName;
        user.lastName = usr.lastName;
        user.username = usr.username;
        user.password = usr.password;
        user.email = usr.email;
        user.role = usr.role;
        user.assigned = usr.assigned;
        
        return user;
    }

    convertModelToUser(usr: User): any {
        
        let user = new User();
        user.id = usr.id;
        user.firstName = usr.firstName;
        user.lastName = usr.lastName;
        user.username = usr.username;
        user.password = usr.password;
        user.email = usr.email;
        user.role = usr.role;
        user.assigned = usr.assigned;
        
        return user;
    }
}