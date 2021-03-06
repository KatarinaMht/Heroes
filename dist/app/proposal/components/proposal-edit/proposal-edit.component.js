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
var proposal_service_1 = require("../../../shared/services/proposal.service");
var proposals_mock_1 = require("../../../shared/mock/proposals-mock");
var edit_module_validator_1 = require("../../../shared/validators/edit-module.validator");
var ProposalEditComponent = (function () {
    function ProposalEditComponent(proposalService, router, route, fb) {
        this.proposalService = proposalService;
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.loading = false;
        //EHI we forget to comunicate to parent that you have submitted something
        this.onSubmitOutput = new core_1.EventEmitter();
        this.createForm();
        console.log(" form constructor");
    }
    Object.defineProperty(ProposalEditComponent.prototype, "proposalId", {
        set: function (id) {
            if (id === undefined)
                return;
            this._proposalId = id;
            console.log('new id', id);
            this.getProposalById(this._proposalId);
        },
        enumerable: true,
        configurable: true
    });
    ProposalEditComponent.prototype.ngOnInit = function () {
        this.moneyProposalList = proposals_mock_1.MONEY_PROPOSAL;
        this.companyProfileList = proposals_mock_1.COMPANY_PROFILE;
        this.nationalWorkProfileList = proposals_mock_1.NATIONAL_WORK_PROFILE;
        if (this.proposalId == undefined) {
            this.getProposalIdFromRoute();
        }
        console.log("this.proposalId = " + this.proposalId);
    };
    /**
     * Gets proposal object by id
     *
     * @param proposalId number
     */
    ProposalEditComponent.prototype.getProposalById = function (id) {
        var _this = this;
        this.loading = true;
        this.proposalService.getProposalById(id).then(function (proposal) {
            _this.editProposal = proposal;
            console.log('proposal to edit', _this.editProposal);
            console.log('actual form before adding value from service', _this.proposalForm, _this.proposalForm.controls['proposalCombo']);
            // this doesn't compile with me!!!
            // this.proposalForm.controls['proposalCombo'].controls['companyProfile'].setValue(this.editProposal.companyProfile);
            // this.proposalForm.controls['proposalCombo'].controls['nationalWorkProfile'].setValue(this.editProposal.nationalWorkProfile);
            // this.proposalForm.controls['proposalCombo'].controls['moneyProposal'].setValue(this.editProposal.moneyProposal);
            // this.proposalForm.controls['proposalCombo'].controls['motivation'].setValue(this.editProposal.motivation);
            _this.proposalForm.controls['proposalCombo'].setValue({
                companyProfile: _this.editProposal.companyProfile,
                nationalWorkProfile: _this.editProposal.nationalWorkProfile,
                moneyProposal: _this.editProposal.moneyProposal,
                motivation: _this.editProposal.motivation
            });
            _this.loading = false;
        }, function (reason) {
            _this.loading = false;
            console.log("error: this.proposalService.getProposalById");
        });
    };
    ProposalEditComponent.prototype.getProposalIdFromRoute = function () {
        var _this = this;
        this.route
            .params
            .subscribe(function (params) {
            console.log('hi');
            _this.proposalId = params['id'];
        });
    };
    ProposalEditComponent.prototype.createForm = function () {
        console.log('createform');
        this.proposalForm = this.fb.group({
            // notUsedGroup: this.fb.group({
            //     address: ['']
            // }),
            proposalCombo: this.fb.group({
                companyProfile: ['Nulla'],
                nationalWorkProfile: ['Nulla'],
                moneyProposal: ['Nulla'],
                motivation: ['']
            }, {
                validator: edit_module_validator_1.editValidator
            })
        });
        console.log('form', this.proposalForm);
    };
    ProposalEditComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loading = true;
        console.log('onSubmit');
        // deep copy
        var formModel = this.proposalForm.controls['proposalCombo'].value;
        var editProposalCopy = _.cloneDeep(this.editProposal); //if you do a deep copy in service you don't have to do here
        editProposalCopy.companyProfile = formModel.companyProfile;
        editProposalCopy.nationalWorkProfile = formModel.nationalWorkProfile;
        editProposalCopy.moneyProposal = formModel.moneyProposal;
        editProposalCopy.motivation = formModel.motivation;
        console.log("onSumbit, editProposalCopy: " + JSON.stringify(editProposalCopy));
        this.proposalService.updateProposal(editProposalCopy).then(function (proposal) {
            console.log("sucess on edit: " + JSON.stringify(proposal));
            _this.onSubmitOutput.emit(proposal);
            _this.loading = false;
        }, function (reason) {
            _this.loading = false;
            console.log("error on edit");
            _this.onSubmitOutput.emit(undefined);
        });
    };
    ProposalEditComponent.prototype.revert = function () {
        console.log('revert');
        this.proposalForm.controls['proposalCombo'].setValue({
            companyProfile: this.editProposal.companyProfile,
            nationalWorkProfile: this.editProposal.nationalWorkProfile,
            moneyProposal: this.editProposal.moneyProposal,
            motivation: this.editProposal.motivation
        });
        this.proposalForm.reset();
        $('#myModal').modal('hide');
    };
    return ProposalEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], ProposalEditComponent.prototype, "proposalId", null);
__decorate([
    core_1.Output('onSubmit'),
    __metadata("design:type", core_1.EventEmitter)
], ProposalEditComponent.prototype, "onSubmitOutput", void 0);
ProposalEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-proposal-edit',
        templateUrl: 'proposal-edit.component.html',
        styleUrls: ['proposal-edit.component.css'],
        providers: [proposal_service_1.ProposalService]
    }),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService, router_1.Router, router_1.ActivatedRoute, forms_1.FormBuilder])
], ProposalEditComponent);
exports.ProposalEditComponent = ProposalEditComponent;

//# sourceMappingURL=proposal-edit.component.js.map
