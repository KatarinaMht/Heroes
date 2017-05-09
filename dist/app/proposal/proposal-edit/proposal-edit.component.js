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
var _ = require("lodash");
var proposal_service_1 = require("../../shared/services/proposal.service");
var ProposalEditComponent = (function () {
    function ProposalEditComponent(proposalService, router, fb) {
        this.proposalService = proposalService;
        this.router = router;
        this.fb = fb;
        this.createForm();
    }
    ProposalEditComponent.prototype.createForm = function () {
        this.proposalForm = this.fb.group({
            moneyProposal: ['', forms_1.Validators.required],
            motivation: ['', forms_1.Validators.required] // Validators.maxLength(200)
        });
    };
    ProposalEditComponent.prototype.ngOnInit = function () {
        // Mock  
        this.editProposal = {
            id: 0,
            userAccount: { firstName: 'Paja', lastName: 'Patak' },
            manager: { firstName: 'Fabio', lastName: 'Staro' },
            moneyProposal: 10000,
            companyProfile: 'kkkkk',
            nationalWorkProfile: 'hhhhh',
            motivation: 'eeeee',
            status: 'Active',
            dateRequest: null
        };
        this.proposalForm.setValue({
            moneyProposal: this.editProposal.moneyProposal,
            motivation: this.editProposal.motivation
        });
    };
    ProposalEditComponent.prototype.onSubmit = function () {
        // deep copy
        var formModel = this.proposalForm.value;
        var editProposalCopy = _.cloneDeep(this.editProposal);
        console.log("onSumbit, editProposalCopy: " + JSON.stringify(editProposalCopy));
        editProposalCopy.moneyProposal = formModel.moneyProposal;
        editProposalCopy.motivation = formModel.motivation;
        this.proposalService.updateProposal(editProposalCopy).then(function (proposal) { console.log("sucess on edit: " + JSON.stringify(proposal)); }, function (reason) { console.log("error on edit"); });
        this.router.navigate(['/proposals']);
    };
    ProposalEditComponent.prototype.revert = function () {
        // this.proposalForm.setValue({
        //     moneyProposal: this.editProposal.moneyProposal,
        //     motivation: this.editProposal.motivation 
        // });
        this.router.navigate(['/proposals']);
    };
    return ProposalEditComponent;
}());
ProposalEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-proposal-edit',
        templateUrl: 'proposal-edit.component.html',
        styleUrls: ['proposal-edit.component.css'],
        providers: [proposal_service_1.ProposalService]
    }),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService, router_1.Router, forms_1.FormBuilder])
], ProposalEditComponent);
exports.ProposalEditComponent = ProposalEditComponent;

//# sourceMappingURL=proposal-edit.component.js.map
