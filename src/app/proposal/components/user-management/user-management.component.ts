import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'esl-user-management',
  templateUrl: 'user-management.component.html',
  styleUrls: ['user-management.component.css']
})

export class UserManagement implements OnInit {

    emloyeeList: User[];
    teamLeaderList: User[];

    constructor(private userService: UserService) {}

    ngOnInit():void {

        this.userService.getEmployees().then (
            list => { 
                console.log("this.emloyeeList = " + JSON.stringify(list));
                this.emloyeeList = list; 
            },
            reject => { }
        );

        this.userService.getTeamLeaders().then (
            list => { 
                console.log("this.teamLeaderList = " + JSON.stringify(list));
                this.teamLeaderList = list; 
            },
            reject => { }
        );
    }
}