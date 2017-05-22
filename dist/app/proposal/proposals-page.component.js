"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var user_model_1 = require("../shared/models/user.model");
var ProposalsPageComponent = (function () {
    function ProposalsPageComponent() {
    }
    ProposalsPageComponent.prototype.ngOnInit = function () {
        this.user = new user_model_1.User;
        this.user.role = window.localStorage.getItem('userRole');
    };
    return ProposalsPageComponent;
}());
ProposalsPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'proposals-page.component.html'
    })
], ProposalsPageComponent);
exports.ProposalsPageComponent = ProposalsPageComponent;

//# sourceMappingURL=proposals-page.component.js.map
