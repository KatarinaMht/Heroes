import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

@Injectable()
export class UserService {

    getTemLeaders(): Promise<Array<User>> {

        let list = [];
        for (let user of USERS) {
            if (user.role == 'TeamLeader') list.push(user);
        }

        return Promise.resolve(list);
    }

    getEmployees(): Promise<Array<User>> {

        let list = [];
        for (let user of USERS) {
            if (user.role == 'Employee') list.push(user);
        }

        return Promise.resolve(list);
    }
}