import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery';

import { Proposal } from '../../../shared/models/proposal.model';
import { ProposalCriteria } from '../../../shared/models/proposal-criteria.model';
import { User } from '../../../shared/models/user.model';

import { ProposalService } from '../../../shared/services/proposal.service';
import { SortService } from '../../../shared/services/sort/sort.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'esl-proposal-list',
  templateUrl: 'proposal-list.component.html',
  styleUrls: ['proposal-list.component.css'],
  providers: [ ProposalService, SortService, FilterService, AuthService ]
})

export class ProposalListComponent implements OnInit {

    @Output() onEdit: EventEmitter<Proposal> = new EventEmitter<Proposal>();
    // @Output() onLock: EventEmitter<Proposal> = new EventEmitter<Proposal>();   or like this????

    user: User;

    proposals: Proposal[];
    proposalCriteria: ProposalCriteria;

    proposalSortedFiltered: Proposal[]; 
    sortByProperties: string[];
    sortByOrders: string[];
    sortingIcons: any;

    proposalFilter: Proposal;
    filterFirstName: string;
    filterLastName: string;
    filterManagerName: string;
    filterCompanyProfile: string;
    filterNationalWorkProfile: string;

    constructor(private proposalService: ProposalService, private sortService: SortService, private filterService: FilterService,
                private authService: AuthService) {}

    ngOnInit(): void {

        // delete this after implemneting login process !!!!!!!!!!
        // this.authService.login('fabstaro','f').then(
        //     user => { this.user = this.authService.getUser();
        //                 console.log("this.user.role = " + this.user.role);
        //             }
        // );

        console.log( "ngOnInit proposal-list");

        this.user = this.authService.getUser();
        console.log("this.user.role = " + this.user.role);

        // change proposalCriteria !!!!!!!!!!!!!
        this.proposalCriteria = {
            id_manager:  this.user.id,
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

        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new User();
    }

    /**
     * Get list of proposlas.
     * 
     * @param criteria ProposalCriteria
     */
    getProposals(criteria: ProposalCriteria) {
console.log("getProposals");
        this.proposalService.getProposals(criteria).then (
            proposals => { this.proposals = proposals; 
                            this.proposalSortedFiltered = proposals;
                            console.log("proposlas: " + JSON.stringify(this.proposals)); 
                        }
        );
    }

    /**
     * Emits proposal for the edit modal.
     */
    openEditModal(proposal: Proposal) {
        this.onEdit.emit(proposal);
    } 

    /**
     * Delets selected propsal.
     */
    deleteProposal(proposal: Proposal) {
        
        this.proposalService.deleteProposal(proposal).then (
            proposal => {},
            reason => {}
        );
    }

    /**
     * Locks selected proposal.
     */
    lock(proposal: Proposal) {

        console.log("lock proposal: " + JSON.stringify(proposal));

        let lockProposal = _.cloneDeep(proposal);
        lockProposal.status = 'Locked';

        this.proposalService.updateProposal(lockProposal).then (
            proposal => { console.log("proposal locked: " + JSON.stringify(proposal)); },
            reason => {}
        );
    }

    /**
     * Reloads proposal list.
     */
    public reload(){
        this.getProposals(this.proposalCriteria);
    }

    /**
     * Set sorting state arrays sortByProperties and sortByOrders by given parameters. 
     * 
     * @param columnName string; Variabile to add sort para,eter to sortByProperties array.
     * @param columnNameIcon string; Variable to manage the state of fa-sort icon.
     */
    sortByColumn(columnName: string, columnNameIcon: string) {

        // this.proposalsSorted = this.sortService.sortArray(this.proposals, columnName, columnNameIcon,
        //                                                      this.sortByProperties, this.sortByOrders, this.sortingIcons);

        let index = this.sortByProperties.indexOf(columnName);
        let isInSortArray =  index !== -1;

        if (isInSortArray) {
            if (this.sortByOrders[index] == 'asc') {

                this.sortByOrders[index] = 'desc';

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = true;
            }
            else {
                _.pullAt(this.sortByProperties,[index]);
                _.pullAt(this.sortByOrders,[index]);

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = false;
            }
        } else {
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
    }

    /**
     * Reset state of fa-sort icons in sortingIcons object to default values.
     */
    resetSortingIcons() {
        this.sortingIcons = { 
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            manager: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false },
            moneyProposal: { asc: false, sort: false }
        };
    }

    /**
     * Sort and filter proposal array.
     */
    proposalSortAndFilter() {
        this.proposalSortedFiltered = this.proposals;

        // Create filter object.
        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new User();
        this.proposalFilter.userAccount.firstName = this.filterFirstName;
        this.proposalFilter.userAccount.lastName = this.filterLastName;
        this.proposalFilter.manager = this.filterManagerName;
        this.proposalFilter.companyProfile = this.filterCompanyProfile;
        this.proposalFilter.nationalWorkProfile = this.filterNationalWorkProfile;
        console.log('proposalFilter: ' + JSON.stringify(this.proposalFilter));

        // FILTER
        this.proposalSortedFiltered = this.filterService.filterBy(this.proposals, this.proposalFilter);
        // SORT
        this.proposalSortedFiltered = _.orderBy(this.proposalSortedFiltered, this.sortByProperties, this.sortByOrders);  
    }    

}