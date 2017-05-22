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
var _ = require("lodash");
var users_mock_1 = require("../mock/users-mock");
// Employee, TeamLeader, Manager
// class User {
//     role:string = '';
// }
var AuthService = AuthService_1 = (function () {
    function AuthService() {
        console.log("I am new one!");
        this.userList = users_mock_1.USERS;
    }
    AuthService.prototype.getUser = function () {
        console.log("get user");
        return AuthService_1.user;
    };
    AuthService.prototype.login = function (username, password) {
        console.log("Usao u login servis: " + username + " " + password);
        for (var _i = 0, _a = this.userList; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.password == password && user.username == username) {
                AuthService_1.user = _.cloneDeep(user);
                // set user data into localStorage
                window.localStorage.setItem('userId', user.id.toString());
                window.localStorage.setItem('userRole', user.role);
                return Promise.resolve(AuthService_1.user);
            }
        }
        return null; //Promise.reject("Wrong username or password.");
    };
    AuthService.prototype.logout = function () {
        AuthService_1.user = null;
        // nothing here ??????? we have localStorage now
    };
    return AuthService;
}());
AuthService = AuthService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;

//# sourceMappingURL=auth.service.js.map
