"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var proposals_mock_1 = require("../../proposal/shared/proposals-mock");
var ProposalService = (function () {
    function ProposalService() {
    }
    ProposalService.prototype.getProposals = function (criteria) {
        return Promise.resolve(proposals_mock_1.PROPOSALS);
    };
    ProposalService.prototype.updateProposal = function (proposal) {
        console.log("updateProposal: " + JSON.stringify(proposal));
        return Promise.resolve(proposal);
    };
    ProposalService.prototype.insertProposal = function (proposal) {
        return null;
    };
    ProposalService.prototype.deleteProposal = function (proposal) {
        return null;
    };
    return ProposalService;
}());
ProposalService = __decorate([
    core_1.Injectable()
], ProposalService);
exports.ProposalService = ProposalService;

//# sourceMappingURL=proposal.service.js.map
