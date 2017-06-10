"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var proposals_component_1 = require("./proposals.component");
var proposal_edit_component_1 = require("./components/proposal-edit/proposal-edit.component");
var proposals_page_component_1 = require("./proposals-page.component");
var user_management_component_1 = require("./components/user-management/user-management.component");
// const routes: Routes = [
//     // { path: '', redirectTo: '/proposals', pathMatch: 'full' },
//     { path: 'proposals',  component: ProposalsComponent },
//     { path: 'proposals/:id/edit',  component: ProposalEditComponent }
// ];
var routes = [
    {
        path: 'evaluations',
        component: proposals_page_component_1.ProposalsPageComponent,
        children: [
            {
                path: 'list',
                component: proposals_component_1.ProposalsComponent,
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: 'edit',
                                component: proposal_edit_component_1.ProposalEditComponent,
                            }
                        ]
                    }
                ]
            },
            {
                path: 'user-management',
                component: user_management_component_1.UserManagement
            }
        ]
    }
];
var ProposalsRoutingModule = (function () {
    function ProposalsRoutingModule() {
    }
    return ProposalsRoutingModule;
}());
ProposalsRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule]
    })
], ProposalsRoutingModule);
exports.ProposalsRoutingModule = ProposalsRoutingModule;
