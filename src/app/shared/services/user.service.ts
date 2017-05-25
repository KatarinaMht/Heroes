import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

@Injectable()
export class UserService {
    mappingTeamLeaderEmployee: { [key: string]: User[]; };
    employeeFilterList: string[];

    constructor() {
        let tmpMappingTeamLeaderEmployee = localStorage.getItem('mappingTeamLeaderEmployee');
        if (tmpMappingTeamLeaderEmployee) {
            this.mappingTeamLeaderEmployee = JSON.parse(tmpMappingTeamLeaderEmployee);
        } else {
            this.mappingTeamLeaderEmployee = {};
        }
        this.createEmployeeFilterList();
    }

    // Create list of employees for filtering purposes
    createEmployeeFilterList() {

        this.employeeFilterList = [];
        for (let user of USERS) {
            if (user.role == 'Employee') {
                this.employeeFilterList.push(user.lastName + ' ' + user.firstName);
            }
        }
        localStorage.setItem('employeeFilterList', JSON.stringify(this.employeeFilterList));
    }

    getTeamLeaders(): Promise<Array<User>> {

        let list = [];
        for (let user of USERS) {
            if (user.role == 'TeamLeader') list.push(user);
        }

        return Promise.resolve(list);
    }

    // get all employees
    getEmployees(criteria: string): Promise<Array<User>> {
        criteria = criteria || '';
        criteria=criteria.toUpperCase()

        let list = [];
        if (criteria) {
            for (let user of USERS) {

                if (user.role == 'Employee' && (criteria === '' || (user.firstName + user.lastName).toUpperCase().indexOf(criteria) >= 0)) {
                    list.push(user);
                }
            }
        }
        return Promise.resolve(list);
    }

    // list of emplopees that are NOT already assigned to teamLeader
    getEmpolyeesForTeamLeader(teamLeader: User): Promise<Array<User>> {

        let list: User[] = [];
        for (let key in this.mappingTeamLeaderEmployee) {
            if (key != teamLeader.email) {
                list = this.mappingTeamLeaderEmployee[key];
            }
        }

        return Promise.resolve(list);
    }

    // list of emplopees that are assigned to teamLeader
    getEmpolyeesByTeamLeader(teamLeader: User): Promise<Array<User>> {

        console.log("getEmpolyeesByTeamLeader - this.mappingTeamLeaderEmployee = " + JSON.stringify(this.mappingTeamLeaderEmployee));
        let list: User[] = [];
        for (let key in this.mappingTeamLeaderEmployee) {
            if (key == teamLeader.email) {
                console.log("this.mappingTeamLeaderEmployee[key] = " + JSON.stringify(this.mappingTeamLeaderEmployee[key]));
                list = this.mappingTeamLeaderEmployee[key];
            }
        }

        return Promise.resolve(list);
    }

    addMapping(teamLeader: User, employee: User) {

        console.log("Mapping - leader = ", teamLeader, employee, this.mappingTeamLeaderEmployee);
        //I use email like unique id
        if (!this.mappingTeamLeaderEmployee[teamLeader.email]) {
            this.mappingTeamLeaderEmployee[teamLeader.email] = [];
        }
        if (this.mappingTeamLeaderEmployee[teamLeader.email].indexOf(employee) == -1) {
            this.mappingTeamLeaderEmployee[teamLeader.email].push(employee);
        }
        console.log("line 68");
        //update info 
        localStorage.setItem('mappingTeamLeaderEmployee', JSON.stringify(this.mappingTeamLeaderEmployee));
        console.log("mappingTeamLeaderEmployee = " + JSON.stringify(this.mappingTeamLeaderEmployee));
    }

    removeMapping(teamLeader: User, employee: User) {
        if (this.mappingTeamLeaderEmployee[teamLeader.email]) {
            let index = this.mappingTeamLeaderEmployee[teamLeader.email].indexOf(employee);
            if (index > -1) {
                this.mappingTeamLeaderEmployee[teamLeader.email].splice(index, 1);
            }
        }
    }

    getEmployeeByUser(user: User): User[] {

        if (this.mappingTeamLeaderEmployee[user.email]) {
            return []; //this.mappingTeamLeaderEmployee[user.email];
        } else {
            return [];
        }
    }

}