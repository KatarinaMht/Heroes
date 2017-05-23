import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'esl-user-management',
  templateUrl: 'user-management.component.html',
  styleUrls: ['user-management.component.css']
})

export class UserManagement implements OnInit {

    employeeList: User[];
    teamLeaderList: User[];

    employeeSelectedList: User[];
    userForm: FormGroup;

    constructor(private userService: UserService, private fb: FormBuilder) {
        this.userForm = this.fb.group({
            teamLeader: ['']
        });
    }

    ngOnInit() {

        this.employeeSelectedList = [];

        this.userService.getEmployees().then (
            list => { 
                console.log("this.emloyeeList = " + JSON.stringify(list));
                this.employeeList = list;
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

    onCheck(user: User) {

        let index = this.employeeSelectedList.indexOf(user);

        if (index > -1) {
            this.employeeSelectedList.splice(index);
        } else {
            this.employeeSelectedList.push(user);
        }
    }

    onSubmit() {

        if (this.employeeSelectedList.length > 0) {
            console.log("this.employeeSelectedList = " + JSON.stringify(this.employeeSelectedList));
            console.log("teamLeader = " + JSON.stringify(this.userForm.controls['teamLeader'].value));
            //this.userService.addMapping(this.userForm.controls['teamLeader'].value, this.employeeSelectedList);
        }
    }
}