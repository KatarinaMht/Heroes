import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery';

import { Proposal } from '../../shared/models/proposal.model';
import { ProposalCriteria } from '../../shared/models/proposal-criteria.model';
import { UserAccount } from '../../shared/models/user-acount.model';

import { ProposalService } from '../../shared/services/proposal.service';
import { SortService } from '../../shared/services/sort/sort.service';
import { FilterService } from '../../shared/services/filter/filter.service';

@Component({
  selector: 'esl-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
  providers: [ ProposalService, SortService, FilterService ]
})

export class ProposalListComponent implements OnInit {

    @Output() onEdit: EventEmitter<Proposal> = new EventEmitter<Proposal>();

    proposals: Proposal[];
    proposalCriteria: ProposalCriteria;

    proposalSortedFiltered: Proposal[]; 
    sortByProperties: string[];
    sortByOrders: string[];
    sortingIcons: any;

    proposalFilter: Proposal;
    filterFirstName: string;
    filterLastName: string;
    filterManagerFirstName: string;
    filterManagerLastName: string;
    filterCompanyProfile: string;
    filterNationalWorkProfile: string;

    ngOnInit(): void {

        // change proposalCriteria!!!
        this.proposalCriteria = null;
        this.getProposals(this.proposalCriteria);

        this.sortByProperties = [];
        this.sortByOrders = [];
        this.sortingIcons = { 
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            managerFirstName: { asc: false, sort: false },
            managerLastName: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };

        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new UserAccount();
        this.proposalFilter.manager = new UserAccount();
    }

    constructor(private proposalService: ProposalService, private sortService: SortService, private filterService: FilterService) {}

    /**
     * Get list of proposlas.
     * 
     * @param criteria ProposalCriteria
     */
    getProposals(criteria: ProposalCriteria) {

        this.proposalService.getProposals(criteria).then (
            proposals => { this.proposals = proposals; 
                            this.proposalSortedFiltered = proposals;
                            console.log(JSON.stringify(this.proposals)); 
                        }
        );
    }

    /**
     * Opens edit modal on button click.
     */
    openEditModal(proposal: Proposal) {
        this.onEdit.emit(proposal);
        //$('#myModal').modal('show');
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
            managerFirstName: { asc: false, sort: false },
            managerLastName: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };
    }

    /**
     * Sort and filter proposal array.
     */
    proposalSortAndFilter() {
        this.proposalSortedFiltered = this.proposals;

        // Create filter object.
        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new UserAccount();
        this.proposalFilter.manager = new UserAccount();
        this.proposalFilter.userAccount.firstName = this.filterFirstName;
        this.proposalFilter.userAccount.lastName = this.filterLastName;
        this.proposalFilter.manager.firstName = this.filterManagerFirstName;
        this.proposalFilter.manager.lastName = this.filterManagerLastName;
        this.proposalFilter.companyProfile = this.filterCompanyProfile;
        this.proposalFilter.nationalWorkProfile = this.filterNationalWorkProfile;
        console.log('proposalFilter: ' + JSON.stringify(this.proposalFilter));

        // FILTER
        this.proposalSortedFiltered = this.filterService.filterBy(this.proposals, this.proposalFilter);
        // SORT
        this.proposalSortedFiltered = _.orderBy(this.proposalSortedFiltered, this.sortByProperties, this.sortByOrders);  
    }    
}