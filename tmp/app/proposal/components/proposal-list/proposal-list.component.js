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
var proposal_model_1 = require("./../../../shared/models/proposal.model");
var user_service_1 = require("./../../../shared/services/user.service");
var core_1 = require("@angular/core");
var _ = require("lodash");
var user_model_1 = require("../../../shared/models/user.model");
var proposal_service_1 = require("../../../shared/services/proposal.service");
var sort_service_1 = require("../../../shared/services/sort/sort.service");
var filter_service_1 = require("../../../shared/services/filter/filter.service");
var auth_service_1 = require("../../../shared/services/auth.service");
var ProposalListComponent = (function () {
    function ProposalListComponent(proposalService, sortService, filterService, authService, userService) {
        this.proposalService = proposalService;
        this.sortService = sortService;
        this.filterService = filterService;
        this.authService = authService;
        this.userService = userService;
        this.onEdit = new core_1.EventEmitter();
        this.onDelete = new core_1.EventEmitter();
        this.allLockStatus = false;
    }
    ProposalListComponent.prototype.ngOnInit = function () {
        // console.log("ngOnInit proposal-list");
        //this.user = this.authService.getUser();
        //console.log("this.user.role = " + this.user.role);
        this.user = new user_model_1.User();
        this.user = this.authService.getUser();
        // change proposalCriteria !!!!!!!!!!!!!
        this.proposalCriteria = {
            id_manager: this.user.id,
            //id_manager: parseInt(window.localStorage.getItem('userId')),
            year: null
        };
        this.getProposals(this.proposalCriteria);
        this.sortByProperties = [];
        this.sortByOrders = [];
        this.sortingIcons = {
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            manager: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };
        this.proposalFilter = new proposal_model_1.Proposal();
        this.proposalFilter.userAccount = new user_model_1.User();
    };
    /**
     * Get list of proposlas.
     *
     * @param criteria ProposalCriteria
     */
    ProposalListComponent.prototype.getProposals = function (criteria) {
        var _this = this;
        this.loading = true;
        var usercriteria = { teamLeaderId: this.user.id };
        this.userService.getEmployees(usercriteria).then(function (users) {
            _this.proposalService.getProposals(criteria).then(function (proposals) {
                var finalProposal = [];
                users.forEach(function (u) {
                    var trovato = false;
                    // console.log('ps', proposals);
                    proposals.forEach(function (p) {
                        // console.log('check', p.userAccount.id, u.id);
                        if (p.userAccount.id === u.id) {
                            // console.log('trovato', p);
                            trovato = true;
                            finalProposal.push(p);
                        }
                    });
                    if (!trovato) {
                        // console.log('non trovato', u.id);
                        var np = new proposal_model_1.Proposal();
                        np.userAccount = u;
                        finalProposal.push(np);
                    }
                });
                _this.proposals = finalProposal;
                _this.proposalSortedFiltered = finalProposal;
                _this.loading = false;
            }).catch(function () {
                _this.loading = false;
            });
            // console.log("proposlas: " + JSON.stringify(this.proposals));
        });
    };
    /**
     * Emits proposal for the edit modal.
     */
    ProposalListComponent.prototype.openEditModal = function (proposal) {
        this.onEdit.emit(proposal);
    };
    /**
     * Delets selected propsal.
     */
    ProposalListComponent.prototype.deleteProposal = function (proposal) {
        // console.log("1 prop list deleteProposal = " + JSON.stringify(proposal));
        this.onDelete.emit(proposal);
        this.reload();
    };
    ProposalListComponent.prototype.lockAll = function () {
        var _this = this;
        this.proposals.forEach(function (p) {
            _this.lock(p, true, 'Active'); //this.allLockStatus?'Active':'Locked'
        });
        this.allLockStatus = !this.allLockStatus;
        this.reload();
    };
    /**
     * Locks selected proposal.
     */
    ProposalListComponent.prototype.lock = function (proposal, all, value) {
        var _this = this;
        // console.log("lock proposal: " + JSON.stringify(proposal));
        if (!proposal.id) {
            this.proposalService.insertProposal(proposal).then(function (proposalreturned) {
                _this.realLock(proposalreturned, all, value);
            });
        }
        else {
            this.realLock(proposal, all, value);
        }
    };
    ProposalListComponent.prototype.realLock = function (proposal, all, value) {
        var _this = this;
        var lockProposal = _.cloneDeep(proposal);
        if (lockProposal.status === 'Locked' && !all) {
            lockProposal.status = value || 'Active';
        }
        else {
            lockProposal.status = 'Locked';
        }
        this.proposalService.updateProposal(lockProposal).then(function (proposal) {
            // console.log("proposal locked: " + JSON.stringify(proposal));
            if (!all) {
                _this.reload();
            }
        }, function (reason) { });
    };
    /**
     * Reloads proposal list.
     */
    ProposalListComponent.prototype.reload = function () {
        // console.log("reload - proposal-list.component.ts");
        this.getProposals(this.proposalCriteria);
    };
    /**
     * Set sorting state arrays sortByProperties and sortByOrders by given parameters.
     *
     * @param columnName string; Variabile to add sort para,eter to sortByProperties array.
     * @param columnNameIcon string; Variable to manage the state of fa-sort icon.
     */
    ProposalListComponent.prototype.sortByColumn = function (columnName, columnNameIcon) {
        // this.proposalsSorted = this.sortService.sortArray(this.proposals, columnName, columnNameIcon,
        //                                                      this.sortByProperties, this.sortByOrders, this.sortingIcons);
        var index = this.sortByProperties.indexOf(columnName);
        var isInSortArray = index !== -1;
        if (isInSortArray) {
            if (this.sortByOrders[index] == 'asc') {
                this.sortByOrders[index] = 'desc';
                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = true;
            }
            else {
                _.pullAt(this.sortByProperties, [index]);
                _.pullAt(this.sortByOrders, [index]);
                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = false;
            }
        }
        else {
            // For one column sort:
            this.sortByProperties = [];
            this.sortByOrders = [];
            this.resetSortingIcons();
            //
            this.sortByProperties.push(columnName);
            this.sortByOrders.push('asc');
            this.sortingIcons[columnNameIcon].asc = true;
            this.sortingIcons[columnNameIcon].sort = true;
        }
    };
    /**
     * Reset state of fa-sort icons in sortingIcons object to default values.
     */
    ProposalListComponent.prototype.resetSortingIcons = function () {
        this.sortingIcons = {
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            manager: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false },
            moneyProposal: { asc: false, sort: false }
        };
    };
    /**
     * Sort and filter proposal array.
     */
    ProposalListComponent.prototype.proposalSortAndFilter = function () {
        this.proposalSortedFiltered = this.proposals;
        // Create filter object.
        this.proposalFilter = new proposal_model_1.Proposal();
        this.proposalFilter.userAccount = new user_model_1.User();
        this.proposalFilter.userAccount.firstName = this.filterFirstName;
        this.proposalFilter.userAccount.lastName = this.filterLastName;
        this.proposalFilter.manager = this.filterManagerName;
        this.proposalFilter.companyProfile = this.filterCompanyProfile;
        this.proposalFilter.nationalWorkProfile = this.filterNationalWorkProfile;
        // console.log('proposalFilter: ' + JSON.stringify(this.proposalFilter));
        // FILTER
        this.proposalSortedFiltered = this.filterService.filterBy(this.proposals, this.proposalFilter);
        // SORT
        this.proposalSortedFiltered = _.orderBy(this.proposalSortedFiltered, this.sortByProperties, this.sortByOrders);
    };
    return ProposalListComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ProposalListComponent.prototype, "onEdit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ProposalListComponent.prototype, "onDelete", void 0);
ProposalListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'esl-proposal-list',
        template: "<div class=\"table-responsive\"><loading [loading]=\"loading\"></loading><table id=\"proposalList-table\" class=\"table table-striped table-bordered table-hover table-condensed\"><thead class=\"thead-primary\"><tr><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('userAccount.firstName', 'fisrtName'); proposalSortAndFilter()\">Nome <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.fisrtName.sort,                                                             'fa-sort-asc':sortingIcons.fisrtName.sort && sortingIcons.fisrtName.asc,                                                             'fa-sort-desc':sortingIcons.fisrtName.sort && !sortingIcons.fisrtName.asc}\"></span></span><div class=\"input-group input-group-sm\"><input [(ngModel)]=\"filterFirstName\" (ngModelChange)=\"proposalSortAndFilter()\" class=\"form-control\"></div></th><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('userAccount.lastName', 'lastName'); proposalSortAndFilter()\">Cognome <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.lastName.sort,                                                             'fa-sort-asc':sortingIcons.lastName.sort && sortingIcons.lastName.asc,                                                             'fa-sort-desc':sortingIcons.lastName.sort && !sortingIcons.lastName.asc}\"></span></span><div class=\"input-group input-group-sm\"><input [(ngModel)]=\"filterLastName\" (ngModelChange)=\"proposalSortAndFilter()\" class=\"form-control\"></div></th><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('manager', 'manager'); proposalSortAndFilter();\">Valutatore <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.manager.sort,                                                           'fa-sort-asc':sortingIcons.manager.sort && sortingIcons.manager.asc,                                                           'fa-sort-desc':sortingIcons.manager.sort && !sortingIcons.manager.asc}\"></span></span><div class=\"input-group input-group-sm\"><input [(ngModel)]=\"filterManagerName\" (ngModelChange)=\"proposalSortAndFilter()\" class=\"form-control\"></div></th><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('companyProfile', 'companyProfile'); proposalSortAndFilter();\">Profilo aziendale <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.companyProfile.sort,                                                           'fa-sort-asc':sortingIcons.companyProfile.sort && sortingIcons.companyProfile.asc,                                                           'fa-sort-desc':sortingIcons.companyProfile.sort && !sortingIcons.companyProfile.asc}\"></span></span><div class=\"input-group input-group-sm\"><input [(ngModel)]=\"filterCompanyProfile\" (ngModelChange)=\"proposalSortAndFilter()\" class=\"form-control\"></div></th><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('nationalWorkProfile', 'nationalWorkProfile'); proposalSortAndFilter();\">Livello sindacale <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.nationalWorkProfile.sort,                                                           'fa-sort-asc':sortingIcons.nationalWorkProfile.sort && sortingIcons.nationalWorkProfile.asc,                                                           'fa-sort-desc':sortingIcons.nationalWorkProfile.sort && !sortingIcons.nationalWorkProfile.asc}\"></span></span><div class=\"input-group input-group-sm\"><input [(ngModel)]=\"filterNationalWorkProfile\" (ngModelChange)=\"proposalSortAndFilter()\" class=\"form-control\"></div></th><th class=\"text-center col-md-1\"><span (click)=\"sortByColumn('moneyProposal', 'moneyProposal'); proposalSortAndFilter();\">Proposta monetaria <span class=\"fa fa-lg\" [ngClass]=\"{'fa-sort':!sortingIcons.nationalWorkProfile.sort,                                                           'fa-sort-asc':sortingIcons.nationalWorkProfile.sort && sortingIcons.nationalWorkProfile.asc,                                                           'fa-sort-desc':sortingIcons.nationalWorkProfile.sort && !sortingIcons.nationalWorkProfile.asc}\"></span></span></th><th class=\"text-center col-md-1\" style=\"min-width: 30vw\"><span>Motivazioni</span></th><th class=\"text-center col-md-1\"><span *ngIf=\"user.isRole('admin')\"><button class=\"btn btn-primary btn-sm\" (click)=\"lockAll()\"><span class=\"fa faX2 fa-lock\" aria-hidden=\"true\"></span></button></span></th></tr></thead><tbody><tr *ngFor=\"let proposal of proposalSortedFiltered\" [ngClass]=\"{'locked': proposal.status === 'Locked'}\"><td class=\"text-center col-md-1\">{{ proposal.userAccount.firstName }}</td><td class=\"text-center col-md-1\">{{ proposal.userAccount.lastName }}</td><td class=\"text-center col-md-1\">{{ proposal.manager?.firstName }} {{ proposal.manager?.lastName }}</td><td class=\"text-center col-md-1\">{{ proposal.companyProfile }}</td><td class=\"text-center col-md-1\">{{ proposal.nationalWorkProfile }}</td><td class=\"text-center col-md-1\">{{ proposal.moneyProposal }}</td><td class=\"text-center col-md-1\">{{ proposal.motivation }}</td><td class=\"text-center col-md-1\"><span *ngIf=\"(user.isRole('admin')) || ( user.isRole('evaluator') && proposal.status != 'Locked')\"><button class=\"btn btn-primary btn-sm\" (click)=\"openEditModal(proposal)\"><span class=\"fa fa-pencil\" aria-hidden=\"true\"></span></button> <button class=\"btn btn-danger btn-sm\" *ngIf=\"proposal.id\" (click)=\"deleteProposal(proposal)\"><span class=\"fa fa-trash\" aria-hidden=\"true\"></span></button> </span><span *ngIf=\"user.isRole('admin')\"><button class=\"btn btn-primary btn-sm\" (click)=\"lock(proposal)\" [disabled]=\"proposal.status == 'Locked'\"><span class=\"fa fa-lock\" aria-hidden=\"true\"></span></button></span></td></tr></tbody></table></div>",
        styles: [".locked{opacity:0.2}.locked:hover{opacity:1}.locked td{color:#888;background-clip:#efefef}"],
        providers: [proposal_service_1.ProposalService, sort_service_1.SortService, filter_service_1.FilterService, auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [proposal_service_1.ProposalService, sort_service_1.SortService, filter_service_1.FilterService,
        auth_service_1.AuthService, user_service_1.UserService])
], ProposalListComponent);
exports.ProposalListComponent = ProposalListComponent;
