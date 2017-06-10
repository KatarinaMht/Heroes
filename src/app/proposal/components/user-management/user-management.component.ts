import { AuthService } from './../../../shared/services/auth.service';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/Rx';

import { UserService } from '../../../shared/services/user.service';

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
    loading:boolean=false;
    loadingSearch:boolean=false;

    //employeeSelectedList: User[];
    userForm: FormGroup;
    isAdmin: boolean;
    constructor(private userService: UserService, private fb: FormBuilder, private filterService: FilterService, private authService: AuthService) {
        this.userForm = this.fb.group({
            teamLeader: [],
            filterName: []
        });
        // this.isAdmin=authService.getUser().role==='admin';
        this.isAdmin=this.authService.getUser().isRole('admin');
        this.userForm.controls['filterName'].valueChanges.debounceTime(400).distinctUntilChanged().subscribe(this.search);
        this.userForm.controls['teamLeader'].valueChanges.subscribe(this.onTeamLeaderChanged);
    }

    ngOnInit() {
       
        this.userForm.controls['teamLeader'].setValue(null);
        this.loadTeamleader();
    }

    search = (criteria: string) => {
        this.employeeList = [];

        this.loadEmployeeNotAssignedLists(criteria);

    }

    loadTeamleader() {
        this.loading=true;

        this.userService.getEmployees({ onlyTeamLeader: '1' }).then(
            list => {
                
                // console.log("THE BEST this.teamLeaderList = ", list); //it's best 
                this.teamLeaderList = list;
                this.loading=false;
            },
            reject => { this.loading=false;}
        );
    }

    addTeamLeader(user: User) {
        this.loading=true;
        this.userService.addEvaluatorRole(user).then(()=>{
            this.loading=false;
            this.loadTeamleader();
        });
        
    }

    // not my employees
    loadEmployeeNotAssignedLists(criteria: string) {
        
        if (!criteria || criteria.length <= 0) {
            
            return;
        }
        this.loadingSearch=true;
        this.userService.getEmployees({ nameSearch: criteria }).then(
            list => {
               // console.log("this.employeeList = " + JSON.stringify(list));
                if (this.teamLeadersEmpList) {
                    list.forEach((e) => {
                        e.assigned = false;
                        this.teamLeadersEmpList.forEach((assignedEmploy) => {
                            if (assignedEmploy.email === e.email) {
                                e.assigned = true;
                            }
                        });

                    });
                   
                }
                this.employeeList = list;
                 this.loadingSearch=false;
            },
            reject => {  this.loadingSearch=false;}
        );
    }

    // my employees
    loadEmployeeAssignedLists() {
       
        if (this.userForm.controls['teamLeader'].value != null) {
              this.loading=true;
            // console.log('da pulire', this.userForm.controls['teamLeader'].value);
            this.userService.getEmployees({ teamLeaderId: this.userForm.controls['teamLeader'].value.id }).then(
                list => {
                    // console.log("this.teamLeadersEmpList = " + JSON.stringify(list));
                    this.teamLeadersEmpList = list;
                    if (this.allUsers == null) this.allUsers = list;
                    this.loading=false;
                },
                reject => {  this.loading=false; }
            );
        }
    }

    addEmployee(user: User) {
          this.loading=true;
        // console.log("Add employee: " + JSON.stringify(user));
        this.userService.addMapping(this.userForm.controls['teamLeader'].value, user).then(() => {
            this.loadEmployeeAssignedLists();
            this.loadEmployeeNotAssignedLists(this.userForm.controls['filterName'].value);
              this.loading=false;
        }).catch(()=>{  this.loading=false;});


    }

    removeEmployee(user: User) {
          this.loading=true;
        // console.log("Remove employee: " + JSON.stringify(user));
        this.userService.removeMapping(this.userForm.controls['teamLeader'].value, user).then(() => {
            this.loadEmployeeAssignedLists();
            this.loadEmployeeNotAssignedLists(this.userForm.controls['filterName'].value);
              this.loading=false;
          }).catch(()=>{  this.loading=false;});

    }

    onTeamLeaderChanged = (teamLeader: User) => {
        this.loadEmployeeAssignedLists();
        this.userForm.controls['filterName'].reset('');
        this.employeeList = [];                             // ne mora, ali je brze od reset-a
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