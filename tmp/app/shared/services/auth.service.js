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
var configuration_service_1 = require("./configuration/configuration.service");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var user_model_1 = require("../models/user.model");
var AuthService = AuthService_1 = (function () {
    function AuthService(http, conf) {
        this.http = http;
        this.conf = conf;
        console.log("I am new one!");
        this.url = this.conf.getApiEndpoint('login');
        //and check if user it's just logged
        var tmpuser = JSON.parse(window.localStorage.getItem('user'));
        if (tmpuser) {
            AuthService_1.user = new user_model_1.User();
            AuthService_1.user.username = tmpuser.username;
            AuthService_1.user.password = tmpuser.password;
            AuthService_1.user.id = tmpuser.id;
            AuthService_1.user.email = tmpuser.email;
            AuthService_1.user.roles = tmpuser.roles;
        }
    }
    AuthService.prototype.getUser = function () {
        console.log("get user");
        return AuthService_1.user;
    };
    AuthService.prototype.login = function (username, password) {
        return this.http.post(this.url, { "username": username, "password": password }).toPromise().then(function (response) {
            var user = response.text();
            console.log('login', user);
            localStorage.setItem('userToken', JSON.stringify(user));
            var base64Url = user.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            var obj = JSON.parse(window.atob(base64));
            user = JSON.parse(obj.sub);
            localStorage.setItem('user', JSON.stringify(user));
            AuthService_1.user = new user_model_1.User();
            AuthService_1.user.username = user.username;
            AuthService_1.user.password = user.password;
            AuthService_1.user.id = user.id;
            AuthService_1.user.email = user.email;
            AuthService_1.user.roles = user.roles;
            return AuthService_1.user;
        });
    };
    AuthService.prototype.logout = function () {
        AuthService_1.user = null;
        window.localStorage.clear();
    };
    return AuthService;
}());
AuthService = AuthService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, configuration_service_1.ConfigurationsService])
], AuthService);
exports.AuthService = AuthService;
var AuthService_1;
