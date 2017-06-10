"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var _ = require("lodash");
var proposal_model_1 = require("../../../shared/models/proposal.model");
var user_model_1 = require("../../../shared/models/user.model");
var ProposalConverter = (function () {
    function ProposalConverter() {
    }
    ProposalConverter.prototype.convertProposalToModel = function (prop) {
        // console.log('converter of proposal',prop);
        var proposal = new proposal_model_1.Proposal();
        proposal.id = prop.id;
        proposal.userAccount = _.cloneDeep(prop.userAccount);
        proposal.manager = _.cloneDeep(prop.manager);
        proposal.moneyProposal = prop.moneyProposal;
        proposal.companyProfile = prop.companyProfile;
        proposal.nationalWorkProfile = prop.nationalWorkProfile;
        proposal.motivation = prop.motivation;
        proposal.status = prop.status;
        proposal.dateRequest = prop.dateRequest;
        // console.log('after',proposal);
        return proposal;
    };
    ProposalConverter.prototype.convertModelToProposal = function (prop) {
        var proposal = {};
        proposal.id = prop.id;
        proposal.userAccount = new user_model_1.User();
        proposal.userAccount = _.cloneDeep(prop.userAccount);
        proposal.manager = new user_model_1.User();
        proposal.manager = _.cloneDeep(prop.manager);
        proposal.moneyProposal = prop.moneyProposal;
        proposal.companyProfile = prop.companyProfile;
        proposal.nationalWorkProfile = prop.nationalWorkProfile;
        proposal.motivation = prop.motivation;
        proposal.status = prop.status;
        proposal.dateRequest = prop.dateRequest;
        return proposal;
    };
    return ProposalConverter;
}());
ProposalConverter = __decorate([
    core_1.Injectable()
], ProposalConverter);
exports.ProposalConverter = ProposalConverter;
