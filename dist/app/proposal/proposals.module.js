"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../shared/shared.module");
var proposals_component_1 = require("./proposals.component");
var proposal_list_component_1 = require("./components/proposal-list/proposal-list.component");
var user_management_component_1 = require("./components/user-management/user-management.component");
var proposal_edit_component_1 = require("./components/proposal-edit/proposal-edit.component");
var proposals_routing_module_1 = require("./proposals-routing.module");
var proposals_page_component_1 = require("./proposals-page.component");
var ProposalsModule = (function () {
    function ProposalsModule() {
    }
    return ProposalsModule;
}());
ProposalsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            forms_1.ReactiveFormsModule,
            proposals_routing_module_1.ProposalsRoutingModule
        ],
        exports: [
            proposals_component_1.ProposalsComponent,
            proposal_list_component_1.ProposalListComponent,
            user_management_component_1.UserManagement,
            proposal_edit_component_1.ProposalEditComponent
        ],
        declarations: [
            proposals_component_1.ProposalsComponent,
            proposal_list_component_1.ProposalListComponent,
            user_management_component_1.UserManagement,
            proposal_edit_component_1.ProposalEditComponent,
            proposals_page_component_1.ProposalsPageComponent
        ],
        providers: []
    })
], ProposalsModule);
exports.ProposalsModule = ProposalsModule;

//# sourceMappingURL=proposals.module.js.map
