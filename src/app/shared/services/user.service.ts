import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';

import { ConfigurationsService } from './configuration/configuration.service';
import { UserConverter } from '../services/converter/user.converter';

import { User } from '../models/user.model';
import { USERS } from '../mock/users-mock';

@Injectable()
export class UserService {

    //mappingTeamLeaderEmployee: { [key: string]: User[]; };
    //employeeFilterList: string[];
    private endpointForUser: string;

    constructor(private confService: ConfigurationsService, private http: Http, private userConverter: UserConverter) {
       
       this.endpointForUser = this.confService.getApiEndpoint('/users');
    }

    // get employees by paramethers
    // is this ok?????????????????????????????????????????????????
    getEmployees(filterCriteria?: string, idTeamLeader?: number): Promise<Array<User>> {

        filterCriteria = filterCriteria || '';
        idTeamLeader = idTeamLeader || null;

        let params: URLSearchParams = new URLSearchParams();
        params.set('filter_criteria', JSON.stringify(filterCriteria));
        params.set('id_team_leader', JSON.stringify(idTeamLeader));

        return this.http.get(this.endpointForUser, {search: params})
                    .toPromise()
                    .then(response => {
                        let body = response.json();
                        let users = body.data || [];
                        let usersModel: User[] = [];
                        users.forEach((usr: any) => {
                            usersModel.push(this.userConverter.convertUserToModel(usr));
                        });
                        return usersModel;
                    })
                    .catch(this.handleError); 
    }

// IN PROGRES....

    // list of emplopees that are assigned to teamLeader
    getEmpolyeesByTeamLeader(teamLeader: User): Promise<Array<User>> {

        //console.log("getEmpolyeesByTeamLeader - this.mappingTeamLeaderEmployee = " + JSON.stringify(this.mappingTeamLeaderEmployee));
        let list: User[] = [];
        // for (let key in this.mappingTeamLeaderEmployee) {
        //     if (key == teamLeader.email) {
        //         console.log("this.mappingTeamLeaderEmployee[key] = " + JSON.stringify(this.mappingTeamLeaderEmployee[key]));
        //         list = this.mappingTeamLeaderEmployee[key];
        //     }
        // }

        return Promise.resolve(list);
    }

    addMapping(teamLeader: User, employee: User) {

        //console.log("Mapping - leader = ", teamLeader, employee, this.mappingTeamLeaderEmployee);
        //I use email like unique id
        // if (!this.mappingTeamLeaderEmployee[teamLeader.email]) {
        //     this.mappingTeamLeaderEmployee[teamLeader.email] = [];
        // }
        // if (this.mappingTeamLeaderEmployee[teamLeader.email].indexOf(employee) == -1) {
        //     this.mappingTeamLeaderEmployee[teamLeader.email].push(employee);
        // }
        // console.log("line 68");
        // //update info 
        // localStorage.setItem('mappingTeamLeaderEmployee', JSON.stringify(this.mappingTeamLeaderEmployee));
        // console.log("mappingTeamLeaderEmployee JSON = " + JSON.stringify(this.mappingTeamLeaderEmployee));
        // console.log("mappingTeamLeaderEmployee obj = ", this.mappingTeamLeaderEmployee[teamLeader.email]);
    }

    removeMapping(teamLeader: User, employee: User) {
        // if (this.mappingTeamLeaderEmployee[teamLeader.email]) {
        //     let index = this.mappingTeamLeaderEmployee[teamLeader.email].indexOf(employee);
        //     if (index > -1) {
        //         this.mappingTeamLeaderEmployee[teamLeader.email].splice(index, 1);
        //         localStorage.setItem('mappingTeamLeaderEmployee', JSON.stringify(this.mappingTeamLeaderEmployee));
        //     }
        // }
    }

   private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
        console.log("Prop. serv. error: " + error);
    }

}