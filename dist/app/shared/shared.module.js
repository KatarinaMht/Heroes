"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var proposal_service_1 = require("./services/proposal.service");
var auth_service_1 = require("./services/auth.service");
var user_service_1 = require("./services/user.service");
var login_component_1 = require("./components/login/login.component");
var alert_component_1 = require("./components/alert/alert.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var forms_2 = require("@angular/forms");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule,
            common_1.CommonModule,
            forms_2.ReactiveFormsModule
        ],
        exports: [forms_1.FormsModule,
            alert_component_1.AlertComponent,
            login_component_1.LoginComponent
        ],
        declarations: [
            alert_component_1.AlertComponent,
            login_component_1.LoginComponent
        ],
        providers: [
            auth_service_1.AuthService,
            proposal_service_1.ProposalService,
            user_service_1.UserService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;

//# sourceMappingURL=shared.module.js.map
