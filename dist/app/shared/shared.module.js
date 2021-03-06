"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var loading_component_1 = require("./components/loading/loading.component");
var error_visualizer_component_1 = require("./components/error-visualizzer/error-visualizer.component");
var error_service_1 = require("./services/error.service");
var http_inteceptor_1 = require("./services/http-inteceptor");
var configuration_service_1 = require("./services/configuration/configuration.service");
var login_component_1 = require("./components/login/login.component");
var alert_component_1 = require("./components/alert/alert.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var forms_2 = require("@angular/forms");
var proposal_service_1 = require("./services/proposal.service");
var auth_service_1 = require("./services/auth.service");
var user_service_1 = require("./services/user.service");
var filter_service_1 = require("./services/filter/filter.service");
var proposal_converter_1 = require("./services/converter/proposal.converter");
var user_converter_1 = require("./services/converter/user.converter");
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
            login_component_1.LoginComponent,
            error_visualizer_component_1.ErrorVisualizerComponent,
            loading_component_1.LoadingComponent
        ],
        declarations: [
            alert_component_1.AlertComponent,
            login_component_1.LoginComponent,
            error_visualizer_component_1.ErrorVisualizerComponent,
            loading_component_1.LoadingComponent
        ],
        providers: [
            auth_service_1.AuthService,
            proposal_service_1.ProposalService,
            user_service_1.UserService,
            filter_service_1.FilterService,
            // HttpClientService,
            proposal_converter_1.ProposalConverter,
            user_converter_1.UserConverter,
            configuration_service_1.ConfigurationsService,
            http_inteceptor_1.HttpInterceptorProvider,
            error_service_1.ErrorService
        ]
    })
], SharedModule);
exports.SharedModule = SharedModule;

//# sourceMappingURL=shared.module.js.map
