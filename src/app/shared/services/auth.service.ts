import { Injectable } from '@angular/core';

// Employee, TeamLeader, Manager
class User {
    role:string = '';
}

@Injectable()
export class AuthService {

    private user: User = new User();

    getUser(): User {
        return this.user;
    }

    login(username:string, password:string) {
        //this.user.role = 'Manager';
        this.user.role = 'TeamLeader';
    }
    
}