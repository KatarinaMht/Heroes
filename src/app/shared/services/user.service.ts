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

        this.endpointForUser = this.confService.getApiEndpoint('employees');
    }

    // get employees by paramethers
    // is this ok?????????????????????????????????????????????????
    getEmployees(criteria: any): Promise<Array<User>> {
        criteria = criteria || {};

        let params: URLSearchParams = new URLSearchParams();
        if (criteria.nameSearch) params.set('name', criteria.nameSearch);
        if (criteria.teamLeaderId) { params.set('teamLeaderId', criteria.teamLeaderId); }
        if (criteria.onlyTeamLeader) { params.set('onlyteamleader', '1'); 
    
     }

        //console.log('request GET EMPLOYEE', this.endpointForUser, criteria, params);
        return this.http.get(this.endpointForUser, { search: params })
            .toPromise()
            .then(response => {
                console.log("works", response);
                let body = response.json();
                console.log(body);
                let users = body || [];
                let usersModel: User[] = [];
                users.forEach((usr: any) => {
                    console.log(usr);
                    usersModel.push(this.userConverter.convertUserToModel(usr));
                });
                return usersModel;
            })
            .catch(this.handleError);
    }

    // // IN PROGRES....

    //     // list of emplopees that are assigned to teamLeader
    //     getEmpolyeesByTeamLeader(teamLeader: User): Promise<Array<User>> {

    //         //console.log("getEmpolyeesByTeamLeader - this.mappingTeamLeaderEmployee = " + JSON.stringify(this.mappingTeamLeaderEmployee));
    //         let list: User[] = [];
    //         // for (let key in this.mappingTeamLeaderEmployee) {
    //         //     if (key == teamLeader.email) {
    //         //         console.log("this.mappingTeamLeaderEmployee[key] = " + JSON.stringify(this.mappingTeamLeaderEmployee[key]));
    //         //         list = this.mappingTeamLeaderEmployee[key];
    //         //     }
    //         // }

    //         return Promise.resolve(list);
    //     }

    addEvaluatorRole(teamLeader: User) {

        let url = this.endpointForUser + '/' + teamLeader.id + '/roles';

        let params: URLSearchParams = new URLSearchParams();
        params.set('role', 'evaluator');
        return this.http.post(url, null, { search: params })
            .toPromise()
            .then(response => { 
                console.log("works", response);
                return;
            })
            .catch(this.handleError);
    }

    addMapping(teamLeader: User, employee: User) {

        let url = this.endpointForUser + '/' + teamLeader.id + '/managed';
        let body = [employee.id];

        return this.http.post(url, body)
            .toPromise()
            .then(response => {
                console.log("works", response);
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

    removeMapping(teamLeader: User, employee: User) {
        let url = this.endpointForUser + '/' + teamLeader.id + '/managed/' + employee.id;
        // let body=[employee.id];

        return this.http.delete(url)
            .toPromise()
            .then(response => {
                console.log("works", response);
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

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        console.log("Prop. serv. error: " + error);
    }

}