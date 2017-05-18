"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// Employee, TeamLeader, Manager
var User = (function () {
    function User() {
        this.role = '';
    }
    return User;
}());
var AuthService = (function () {
    function AuthService() {
        this.user = new User();
    }
    AuthService.prototype.getUser = function () {
        return this.user;
    };
    AuthService.prototype.login = function (username, password) {
        //this.user.role = 'Manager';
        this.user.role = 'TeamLeader';
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;

//# sourceMappingURL=auth.service.js.map
