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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var configuration_service_1 = require("./configuration/configuration.service");
var proposal_converter_1 = require("../services/converter/proposal.converter");
var ProposalService = (function () {
    function ProposalService(confService, http, proposalConverter) {
        var _this = this;
        this.confService = confService;
        this.http = http;
        this.proposalConverter = proposalConverter;
        this.extractProposal = function (response) {
            var body = response.json();
            var proposal = body || {};
            var proposalModel;
            proposalModel = _this.proposalConverter.convertProposalToModel(proposal);
            return proposalModel;
        };
        this.endpointForProposal = this.confService.getApiEndpoint('proposals');
    }
    ProposalService.prototype.getProposals = function (criteria) {
        var _this = this;
        var url = this.endpointForProposal;
        var params = new http_1.URLSearchParams();
        if (criteria.id_manager) {
            params.set('teamLeaderId', '' + criteria.id_manager);
        }
        // console.log('parte la chiamata');
        return this.http.get(url, { search: params })
            .toPromise()
            .then(function (response) {
            var body = response.json();
            // console.log('getProposals',body);
            var proposals = body || [];
            var proposalsModel = [];
            proposals.forEach(function (prop) {
                if (!prop)
                    return;
                proposalsModel.push(_this.proposalConverter.convertProposalToModel(prop));
            });
            return proposalsModel;
        })
            .catch(this.handleError);
    };
    ProposalService.prototype.getProposalById = function (id) {
        var _this = this;
        var url = this.endpointForProposal + '/' + id;
        var params = new http_1.URLSearchParams();
        //params.set('id_proposal', JSON.stringify(id));
        return this.http.get(url, { search: params })
            .toPromise()
            .then(function (response) {
            var body = response.json();
            // console.log('getProposals',body);
            var proposals = body || [];
            var proposalsModel = [];
            proposals.forEach(function (prop) {
                if (!prop)
                    return;
                proposalsModel.push(_this.proposalConverter.convertProposalToModel(prop));
            });
            return proposalsModel[0];
        })
            .catch(this.handleError);
    };
    ProposalService.prototype.updateProposal = function (proposal) {
        var url = this.endpointForProposal + '/' + proposal.id;
        return this.http.put(url, proposal)
            .toPromise()
            .then(this.extractProposal)
            .catch(this.handleError);
    };
    ProposalService.prototype.insertProposal = function (proposal) {
        var url = this.endpointForProposal;
        return this.http.post(url, proposal)
            .toPromise()
            .then(this.extractProposal)
            .catch(this.handleError);
    };
    ProposalService.prototype.deleteProposal = function (proposal) {
        var url = this.endpointForProposal + '/' + proposal.id;
        return this.http.delete(url)
            .toPromise()
            .then(this.extractProposal)
            .catch(this.handleError);
    };
    ProposalService.prototype.handleError = function (error) {
        console.log("Prop. serv. error: " + error);
    };
    return ProposalService;
}());
ProposalService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [configuration_service_1.ConfigurationsService, http_1.Http, proposal_converter_1.ProposalConverter])
], ProposalService);
exports.ProposalService = ProposalService;
