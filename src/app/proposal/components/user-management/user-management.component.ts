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
    teamLeadersEmpList: User[];

    //employeeSelectedList: User[];
    userForm: FormGroup;

    constructor(private userService: UserService, private fb: FormBuilder) {
        this.userForm = this.fb.group({
            teamLeader: []
        });
    }

    ngOnInit() {

        //this.employeeSelectedList = [];
        //console.log("this.employeeSelectedList.length = " + this.employeeSelectedList.length);
        this.userForm.controls['teamLeader'].setValue(null);

        this.loadEmployeeLists();

        this.userService.getTeamLeaders().then (
            list => { 
                console.log("this.teamLeaderList = " + JSON.stringify(list));
                this.teamLeaderList = list; 
            },
            reject => { }
        );
    }

    loadEmployeeLists() {
        // my employees
        if (this.userForm.controls['teamLeader'].value != null) {
            this.userService.getEmpolyeesByTeamLeader(this.userForm.controls['teamLeader'].value).then (
            //this.userService.getEmployees().then (
                list => { 
                    console.log("this.teamLeadersEmpList = " + JSON.stringify(list));
                    this.teamLeadersEmpList = list;
                },
                reject => { }
            );
        }

        // not my employees
        //this.userService.getEmpolyeesForTeamLeader(this.userForm.controls['teamLeader'].value).then (
        this.userService.getEmployees().then (
            list => { 
                console.log("this.employeeList = " + JSON.stringify(list));
                this.employeeList = list;
            },
            reject => { }
        );
    }

    addEmployee(user: User) {
        console.log("Add employee: " + JSON.stringify(user));
        this.userService.addMapping(this.userForm.controls['teamLeader'].value, user);
        this.loadEmployeeLists();
    }

    removeEmployee(user: User) {
        console.log("Remove employee: " + JSON.stringify(user));
        this.userService.removeMapping(this.userForm.controls['teamLeader'].value, user);
        this.loadEmployeeLists();
    }

    onChange() {
        this.loadEmployeeLists();
    }

    // onCheck(user: User) {

    //     let index = this.employeeSelectedList.indexOf(user);

    //     if (index > -1) {
    //         this.employeeSelectedList.splice(index);
    //     } else {
    //         this.employeeSelectedList.push(user);
    //     }
    //     console.log("this.employeeSelectedList.length = " + this.employeeSelectedList.length);
    // }

    // onSubmit() {

    //     if (this.employeeSelectedList.length > 0) {
    //         console.log("this.employeeSelectedList = " + JSON.stringify(this.employeeSelectedList));
    //         console.log("teamLeader = " + JSON.stringify(this.userForm.controls['teamLeader'].value));
    //         this.userService.addMapping(this.userForm.controls['teamLeader'].value, this.employeeSelectedList);
    //         console.log("I arrived here!");
    //     }
    //}
}