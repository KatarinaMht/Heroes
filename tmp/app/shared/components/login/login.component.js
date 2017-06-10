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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("./../../services/auth.service");
var login_validator_1 = require("./../../validators/login.validator");
var LoginComponent = (function () {
    function LoginComponent(authService, router, fb) {
        this.authService = authService;
        this.router = router;
        this.fb = fb;
        this.createForm();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authService.getUser()) {
            console.log('user cè');
            this.router.navigate(['/evaluations/list']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then(function (user) {
            console.log("User = " + user.username);
            _this.router.navigate(['/evaluations/list']);
        }, function (reason) {
            console.log("ERROR: " + reason);
        });
    };
    LoginComponent.prototype.createForm = function () {
        this.loginForm = this.fb.group({
            username: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required]
        }, {
            validator: login_validator_1.loginValidator
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-login',
        template: "<div class=\"login-form\"><form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\" novalidate><div class=\"form-group\"><label for=\"username\">&nbsp; Username:</label><input name=\"username\" id=\"username\" class=\"form-control\" placeholder=\"Enter username\" formControlName=\"username\"><div class=\"help-block\" *ngIf=\"loginForm.controls['username'].hasError('required') && (loginForm.controls['username'].dirty || loginForm.controls['username'].touched)\">Username must be provided</div></div><div class=\"form-group\"><label for=\"password\">&nbsp; Password:</label><input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" placeholder=\"Enter password\" formControlName=\"password\"><div class=\"help-block\" *ngIf=\"loginForm.controls['password'].hasError('required') &&  (loginForm.controls['password'].dirty || loginForm.controls['password'].touched)\">Password mustb be provided</div></div><div class=\"col-md-12\">&nbsp;</div><div class=\"form-actions\"><button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"loginForm.invalid\">Login</button></div></form></div>",
        styles: [".login-form{position:fixed;width:20%;z-index:2;top:50%;left:50%;margin-top:-10%;margin-left:-10%}"]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;
