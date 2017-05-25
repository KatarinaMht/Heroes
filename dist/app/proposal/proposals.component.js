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
var alert_model_1 = require("./../shared/models/alert.model");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var $ = require("jquery");
var proposal_list_component_1 = require("./components/proposal-list/proposal-list.component");
var proposal_service_1 = require("./../shared/services/proposal.service");
var ProposalsComponent = (function () {
    function ProposalsComponent(proposalService, router) {
        this.proposalService = proposalService;
        this.router = router;
        this.alerts = [];
    }
    ProposalsComponent.prototype.ngOnInit = function () {
        console.log("ngOninit proposal");
        this.alerts = [];
        // test
        this.onError("Test error!");
    };
    /**
     * Opens Edit Modal
     *
     * @param Proposal proposal to be edited
     */
    ProposalsComponent.prototype.onEditClick = function (proposal) {
        var _this = this;
        console.log("this.proposalEditId = " + proposal.id);
        this.proposalEditId = proposal.id;
        $('#myModal').on('hide.bs.modal', function () {
            _this.proposalEditId = undefined;
        });
        $('#myModal').modal('show');
        //this.router.navigate(['/proposal-edit', proposal.id]);
    };
    /**
     * Deletes proposal.
     */
    ProposalsComponent.prototype.onDeleteClick = function (proposal) {
        console.log("2 prop onDeleteClick = " + JSON.stringify(proposal));
        this.proposalService.deleteProposal(proposal).then(function (proposal) { }, function (reason) { });
    };
    ProposalsComponent.prototype.onEditedProposalSubmitted = function (proposalUpdated) {
        if (proposalUpdated) {
            console.log("reload - proposals.component.ts");
            this.proposalList.reload();
        }
        $('#myModal').modal('hide');
        this.proposalEditId = undefined;
    };
    /**
     * Handles errors from server.
     *
     * @param string errorMessage to display to user
     */
    ProposalsComponent.prototype.onError = function (errorMessage) {
        this.alerts.push(new alert_model_1.Alert(alert_model_1.Alert.TYPE_DANGER, errorMessage));
    };
    return ProposalsComponent;
}());
__decorate([
    core_1.ViewChild('proposalList'),
    __metadata("design:type", proposal_list_component_1.ProposalListComponent)
], ProposalsComponent.prototype, "proposalList", void 0);
ProposalsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-proposals',
        templateUrl: 'proposals.component.html',
        styleUrls: ['proposals.component.css']
    }),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService, router_1.Router])
], ProposalsComponent);
exports.ProposalsComponent = ProposalsComponent;

//# sourceMappingURL=proposals.component.js.map
