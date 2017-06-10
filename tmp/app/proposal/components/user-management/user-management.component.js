"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var auth_service_1 = require("./../../../shared/services/auth.service");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
require("rxjs/Rx");
var user_service_1 = require("../../../shared/services/user.service");
var filter_service_1 = require("../../../shared/services/filter/filter.service");
var UserManagement = (function () {
    function UserManagement(userService, fb, filterService, authService) {
        var _this = this;
        this.userService = userService;
        this.fb = fb;
        this.filterService = filterService;
        this.authService = authService;
        this.loading = false;
        this.loadingSearch = false;
        this.search = function (criteria) {
            _this.employeeList = [];
            _this.loadEmployeeNotAssignedLists(criteria);
        };
        this.onTeamLeaderChanged = function (teamLeader) {
            _this.loadEmployeeAssignedLists();
            _this.userForm.controls['filterName'].reset('');
            _this.employeeList = []; // ne mora, ali je brze od reset-a
        };
        this.userForm = this.fb.group({
            teamLeader: [],
            filterName: []
        });
        // this.isAdmin=authService.getUser().role==='admin';
        this.isAdmin = this.authService.getUser().isRole('admin');
        this.userForm.controls['filterName'].valueChanges.debounceTime(400).distinctUntilChanged().subscribe(this.search);
        this.userForm.controls['teamLeader'].valueChanges.subscribe(this.onTeamLeaderChanged);
    }
    UserManagement.prototype.ngOnInit = function () {
        this.userForm.controls['teamLeader'].setValue(null);
        this.loadTeamleader();
    };
    UserManagement.prototype.loadTeamleader = function () {
        var _this = this;
        this.loading = true;
        this.userService.getEmployees({ onlyTeamLeader: '1' }).then(function (list) {
            // console.log("THE BEST this.teamLeaderList = ", list); //it's best 
            _this.teamLeaderList = list;
            _this.loading = false;
        }, function (reject) { _this.loading = false; });
    };
    UserManagement.prototype.addTeamLeader = function (user) {
        var _this = this;
        this.loading = true;
        this.userService.addEvaluatorRole(user).then(function () {
            _this.loading = false;
            _this.loadTeamleader();
        });
    };
    // not my employees
    UserManagement.prototype.loadEmployeeNotAssignedLists = function (criteria) {
        var _this = this;
        if (!criteria || criteria.length <= 0) {
            return;
        }
        this.loadingSearch = true;
        this.userService.getEmployees({ nameSearch: criteria }).then(function (list) {
            // console.log("this.employeeList = " + JSON.stringify(list));
            if (_this.teamLeadersEmpList) {
                list.forEach(function (e) {
                    e.assigned = false;
                    _this.teamLeadersEmpList.forEach(function (assignedEmploy) {
                        if (assignedEmploy.email === e.email) {
                            e.assigned = true;
                        }
                    });
                });
            }
            _this.employeeList = list;
            _this.loadingSearch = false;
        }, function (reject) { _this.loadingSearch = false; });
    };
    // my employees
    UserManagement.prototype.loadEmployeeAssignedLists = function () {
        var _this = this;
        if (this.userForm.controls['teamLeader'].value != null) {
            this.loading = true;
            // console.log('da pulire', this.userForm.controls['teamLeader'].value);
            this.userService.getEmployees({ teamLeaderId: this.userForm.controls['teamLeader'].value.id }).then(function (list) {
                // console.log("this.teamLeadersEmpList = " + JSON.stringify(list));
                _this.teamLeadersEmpList = list;
                if (_this.allUsers == null)
                    _this.allUsers = list;
                _this.loading = false;
            }, function (reject) { _this.loading = false; });
        }
    };
    UserManagement.prototype.addEmployee = function (user) {
        var _this = this;
        this.loading = true;
        // console.log("Add employee: " + JSON.stringify(user));
        this.userService.addMapping(this.userForm.controls['teamLeader'].value, user).then(function () {
            _this.loadEmployeeAssignedLists();
            _this.loadEmployeeNotAssignedLists(_this.userForm.controls['filterName'].value);
            _this.loading = false;
        }).catch(function () { _this.loading = false; });
    };
    UserManagement.prototype.removeEmployee = function (user) {
        var _this = this;
        this.loading = true;
        // console.log("Remove employee: " + JSON.stringify(user));
        this.userService.removeMapping(this.userForm.controls['teamLeader'].value, user).then(function () {
            _this.loadEmployeeAssignedLists();
            _this.loadEmployeeNotAssignedLists(_this.userForm.controls['filterName'].value);
            _this.loading = false;
        }).catch(function () { _this.loading = false; });
    };
    return UserManagement;
}());
UserManagement = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-user-management',
        template: "<loading [loading]=\"loading\"></loading><div *ngIf=\"isAdmin\"><h1>Gestione utenti</h1><br><form [formGroup]=\"userForm\" (ngSubmit)=\"onSubmit()\" novalidate><div class=\"section\"><div class=\"form-group\"><label><b>Valutatori:</b><select class=\"form-control\" formControlName=\"teamLeader\"><option *ngFor=\"let teamLeader of teamLeaderList\" [ngValue]=\"teamLeader\">{{ teamLeader.firstName }} {{ teamLeader.lastName }}</option></select></label><div><p>Dipendenti Gestiti</p><div class=\"table-responsive\"><table id=\"userList-table\" class=\"table table-striped table-bordered table-hover table-condensed\"><thead class=\"thead-primary\"><tr><th class=\"text-center col-md-1\"><span>Nome</span></th><th class=\"text-center col-md-1\"><span>Cognome</span></th><th class=\"text-center col-md-1\"></th></tr></thead><tbody *ngFor=\"let user of teamLeadersEmpList\"><td class=\"text-center col-md-1\">{{ user.firstName }}</td><td class=\"text-center col-md-1\">{{ user.lastName }}</td><td class=\"text-center col-md-1\"><button type=\"button\" class=\"btn btn-danger\" (click)=\"removeEmployee(user)\"><span class=\"fa fa-times\" aria-hidden=\"true\"></span></button></td></tbody></table></div></div></div><div class=\"jumbotron\"><loading [loading]=\"loadingSearch\"></loading><p>Ricerca dipendenti</p><div><div class=\"input-group input-group-sm\"><input class=\"form-control\" formControlName=\"filterName\"></div><br><div class=\"table-responsive\" *ngIf=\"employeeList?.length>0\"><table id=\"userList-table\" class=\"table table-striped table-bordered table-hover table-condensed\"><thead class=\"thead-primary\"><tr><th class=\"text-center col-md-1\"><span>Nome</span></th><th class=\"text-center col-md-1\"><span>Cognome</span></th><th class=\"text-center col-md-1\"></th></tr></thead><tbody *ngFor=\"let user of employeeList\"><td class=\"text-center col-md-1\">{{ user.firstName }}</td><td class=\"text-center col-md-1\">{{ user.lastName }}</td><td class=\"text-center col-md-1\"><button type=\"button\" class=\"btn btn-primary\" (click)=\"addTeamLeader(user)\"><span class=\"fa fa-star\" aria-hidden=\"true\"></span></button> <button *ngIf=\"!user.assigned\" type=\"button\" class=\"btn btn-primary\" (click)=\"addEmployee(user)\" [disabled]=\"userForm.controls['teamLeader'].value == null\"><span class=\"fa fa-plus\" aria-hidden=\"true\"></span></button> <span *ngIf=\"user.assigned\">Associato</span></td></tbody></table></div></div></div><br><br></div></form></div>",
        styles: [".jumbotron{position:relative}"],
        providers: [filter_service_1.FilterService] //??
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, forms_1.FormBuilder, filter_service_1.FilterService, auth_service_1.AuthService])
], UserManagement);
exports.UserManagement = UserManagement;
