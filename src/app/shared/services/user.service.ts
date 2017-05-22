import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

@Injectable()
export class UserService {
    mappingTeamLeaderEmployee: {};

    constructor(){
        let tmpMappingTeamLeaderEmployee=localStorage.getItem('mappingTeamLeaderEmployee');
        if(tmpMappingTeamLeaderEmployee){
            this.mappingTeamLeaderEmployee=tmpMappingTeamLeaderEmployee;
        }else{
            this.mappingTeamLeaderEmployee=[];
        }
    }

    getTeamLeaders(): Promise<Array<User>> {

        let list = [];
        for (let user of USERS) {
            if (user.role == 'TeamLeader') list.push(user);
        }

        return Promise.resolve(list);
    }
    //in the final version you can use only one method with criteria filter for role/who is him team leader to filter the list
    //but for now without be it's okay use two method to skip complex filter on role and team leader attribute
    getEmployees(): Promise<Array<User>> {

        let list = [];
        for (let user of USERS) {
            if (user.role == 'Employee') list.push(user);
        }

        return Promise.resolve(list);
    }

    addMapping(teamLeader: User, emplopee: User[]) {

        //i use email like unique id
        this.mappingTeamLeaderEmployee[teamLeader.email] = emplopee;
        //update info 
        localStorage.setItem('mappingTeamLeaderEmployee', JSON.stringify(this.mappingTeamLeaderEmployee));
    }

    getEmployeeByUser(user: User) {
        if (this.mappingTeamLeaderEmployee[user.email]) {
            return this.mappingTeamLeaderEmployee[user.email];
        } else {
            return [];
        }
    }
    
}