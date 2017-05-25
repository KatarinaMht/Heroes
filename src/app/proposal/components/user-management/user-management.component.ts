import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';
import { FilterService } from '../../../shared/services/filter/filter.service';

@Component({
    moduleId: module.id,
    selector: 'esl-user-management',
    templateUrl: 'user-management.component.html',
    styleUrls: ['user-management.component.css'],
    providers: [FilterService] //??
})

export class UserManagement implements OnInit {

    employeeList: User[];
    teamLeaderList: User[];
    teamLeadersEmpList: User[];
    allUsers: User[];

    //employeeSelectedList: User[];
    userForm: FormGroup;
    //filterName: string;

    constructor(private userService: UserService, private fb: FormBuilder, private filterService: FilterService) {
        this.userForm = this.fb.group({
            teamLeader: [],
            filterName: []
        });

        this.userForm.controls['filterName'].valueChanges.subscribe(this.search); //.debounceTime(850).distinctUntilChanged()
        this.userForm.controls['teamLeader'].valueChanges.subscribe(this.onTeamLeaderChanged);
    }

    ngOnInit() {

        //this.employeeSelectedList = [];
        //console.log("this.employeeSelectedList.length = " + this.employeeSelectedList.length);
        this.userForm.controls['teamLeader'].setValue(null);
        this.loadTeamleader();        
    }

    search=(criteria: string)=> {
         this.employeeList=[];
        // not my employees
        //this.userService.getEmpolyeesForTeamLeader(this.userForm.controls['teamLeader'].value).then (
        this.userService.getEmployees(criteria).then(
            list => {
                console.log("this.employeeList = " + JSON.stringify(list));
                list.forEach((e) => {
                    e.assigned = false;
                    this.teamLeadersEmpList.forEach((assignedEmploy) => {
                        if (assignedEmploy.email === e.email) {
                            e.assigned = true;
                        }
                    });

                });
                this.employeeList = list;
            },
            reject => { }
        );
    }

    loadTeamleader() {
        this.userService.getTeamLeaders().then(
            list => {
                console.log("NOT USE ME :D this.teamLeaderList = " + JSON.stringify(list));
                console.log("THE BEST this.teamLeaderList = ", list); //it's best 
                this.teamLeaderList = list;
            },
            reject => { }
        );
    }

    loadEmployeeAssignedLists() {
        // my employees
        if (this.userForm.controls['teamLeader'].value != null) {
            this.userService.getEmpolyeesByTeamLeader(this.userForm.controls['teamLeader'].value).then(
                //this.userService.getEmployees().then (
                list => {
                    console.log("this.teamLeadersEmpList = " + JSON.stringify(list));
                    this.teamLeadersEmpList = list;
                    if (this.allUsers == null) this.allUsers = list;
                },
                reject => { }
            );
        }       
    }

    addEmployee(user: User) {
        console.log("Add employee: " + JSON.stringify(user));
        this.userService.addMapping(this.userForm.controls['teamLeader'].value, user);
        this.loadEmployeeAssignedLists();
    }

    removeEmployee(user: User) {
        console.log("Remove employee: " + JSON.stringify(user));
        this.userService.removeMapping(this.userForm.controls['teamLeader'].value, user);
        this.loadEmployeeAssignedLists();
    }


    onTeamLeaderChanged=(teamLeader:User)=>{
        this.loadEmployeeAssignedLists();
    }
    

    usersFilter() {
        // NO GOOD !!!!!!!!!!!!!
        //this.employeeList = this.filterService.filterBy(this.allUsers, this.userForm.controls['filterName'].value);
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