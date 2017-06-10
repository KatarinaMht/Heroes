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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var configuration_service_1 = require("./configuration/configuration.service");
var user_converter_1 = require("../services/converter/user.converter");
var UserService = (function () {
    function UserService(confService, http, userConverter) {
        this.confService = confService;
        this.http = http;
        this.userConverter = userConverter;
        this.endpointForUser = this.confService.getApiEndpoint('employees');
    }
    // get employees by paramethers
    // is this ok?????????????????????????????????????????????????
    UserService.prototype.getEmployees = function (criteria) {
        var _this = this;
        criteria = criteria || {};
        var params = new http_1.URLSearchParams();
        if (criteria.nameSearch)
            params.set('name', criteria.nameSearch);
        if (criteria.teamLeaderId) {
            params.set('teamLeaderId', criteria.teamLeaderId);
        }
        if (criteria.onlyTeamLeader) {
            params.set('onlyteamleader', '1');
        }
        //console.log('request GET EMPLOYEE', this.endpointForUser, criteria, params);
        return this.http.get(this.endpointForUser, { search: params })
            .toPromise()
            .then(function (response) {
            // console.log("works", response);
            var body = response.json();
            // console.log(body);
            var users = body || [];
            var usersModel = [];
            users.forEach(function (usr) {
                // console.log(usr);
                usersModel.push(_this.userConverter.convertUserToModel(usr));
            });
            return usersModel;
        })
            .catch(this.handleError);
    };
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
    UserService.prototype.addEvaluatorRole = function (teamLeader) {
        var url = this.endpointForUser + '/' + teamLeader.id + '/roles';
        var params = new http_1.URLSearchParams();
        params.set('role', 'evaluator');
        return this.http.post(url, null, { search: params })
            .toPromise()
            .then(function (response) {
            // console.log("works", response);
            return;
        })
            .catch(this.handleError);
    };
    UserService.prototype.addMapping = function (teamLeader, employee) {
        var _this = this;
        var url = this.endpointForUser + '/' + teamLeader.id + '/managed';
        var body = [employee.id];
        return this.http.post(url, body)
            .toPromise()
            .then(function (response) {
            // console.log("works", response);
            var body = response.json();
            var users = body.data || [];
            var usersModel = [];
            users.forEach(function (usr) {
                usersModel.push(_this.userConverter.convertUserToModel(usr));
            });
            return usersModel;
        })
            .catch(this.handleError);
    };
    UserService.prototype.removeMapping = function (teamLeader, employee) {
        var _this = this;
        var url = this.endpointForUser + '/' + teamLeader.id + '/managed/' + employee.id;
        // let body=[employee.id];
        return this.http.delete(url)
            .toPromise()
            .then(function (response) {
            // console.log("works", response);
            var body = response.json();
            var users = body.data || [];
            var usersModel = [];
            users.forEach(function (usr) {
                usersModel.push(_this.userConverter.convertUserToModel(usr));
            });
            return usersModel;
        })
            .catch(this.handleError);
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        return body.data || {};
    };
    UserService.prototype.handleError = function (error) {
        console.log("Prop. serv. error: " + error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationsService, http_1.Http, user_converter_1.UserConverter])
], UserService);
exports.UserService = UserService;
