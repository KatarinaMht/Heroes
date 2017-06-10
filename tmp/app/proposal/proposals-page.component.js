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
var auth_service_1 = require("./../shared/services/auth.service");
var core_1 = require("@angular/core");
var ProposalsPageComponent = (function () {
    function ProposalsPageComponent(auth) {
        this.auth = auth;
    }
    ProposalsPageComponent.prototype.ngOnInit = function () {
        this.user = this.auth.getUser();
    };
    return ProposalsPageComponent;
}());
ProposalsPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: "<div class=\"container\"><div class=\"header clearfix\"><nav><ul class=\"nav nav-pills float-right\"><li class=\"nav-item\"><a class=\"nav-link active\" href=\"#/evaluations/list\">Gestione proposte <span class=\"sr-only\">(current)</span></a></li><li class=\"nav-item\" *ngIf=\"user.isRole('admin')\"><a class=\"nav-link\" href=\"#/evaluations/user-management\">Gestione utenti</a></li></ul></nav><h3 class=\"text-muted\"><object data=\"images/esl.svg\" type=\"image/svg+xml\" height=\"80\"><img src=\"images/esl.png\"></object></h3></div><router-outlet></router-outlet><footer class=\"footer\"><p>Make with \u1559(`\u25BF\u00B4)\u1557</p></footer></div>"
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], ProposalsPageComponent);
exports.ProposalsPageComponent = ProposalsPageComponent;
