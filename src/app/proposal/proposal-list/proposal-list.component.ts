import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

import { Proposal } from '../shared/proposal.model';
import { ProposalService } from '../shared/proposal.service';
import { ProposalCriteria } from '../shared/proposal-criteria.model';

@Component({
  selector: 'esl-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
  providers: [ ProposalService ]
})

export class ProposalListComponent implements OnInit {

    proposals: Proposal[];
    proposalCriteria: ProposalCriteria;

    sortByProperties: string[];
    sortByOrders: string[];
    sortingIcons: any;

    ngOnInit(): void {

        // change proposalCriteria!!!
        this.proposalCriteria = null;
        this.getProposals(this.proposalCriteria);

        this.sortByProperties = [];
        this.sortByOrders = [];
        this.sortingIcons = { 
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            managerFistName: { asc: false, sort: false },
            managerLastName: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };
    }

    constructor(private proposalService: ProposalService) {}

    getProposals(criteria: ProposalCriteria) {

        this.proposalService.getProposals(criteria).then (
            proposals => { this.proposals = proposals; console.log(JSON.stringify(this.proposals)); }
        );
    }

    // SORT
    sortByColumn(columnName: string, columnNameIcon: string) {
console.log("Sort columnName: " + columnName + " columnNameIcon: " + columnNameIcon);
        var index = this.sortByProperties.indexOf(columnName);
        var isInSortArray =  index !== -1 ;

        if (isInSortArray) {
            if (this.sortByOrders[index] == 'asc') {

                this.sortByOrders[index] = 'desc';

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = true;
            }
            else {
                console.log("mot in isInSortArray");
                _.pullAt(this.sortByProperties,[index]);
                _.pullAt(this.sortByOrders,[index]);

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = false;
            }
        } else {
            console.log("usao u else");
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

    resetSortingIcons() {
        console.log("reset");
        this.sortingIcons = { 
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            managerFistName: { asc: false, sort: false },
            managerLastName: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };
    }

    evaluationSort() {
        console.log("evaluationSort: sortByPropertie = " + this.sortByProperties + "sortByOrders = " + this.sortByOrders);
      this.proposals = _.orderBy(this.proposals, this.sortByProperties, this.sortByOrders);  
    }    
}