import { Component, OnInit } from '@angular/core';

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

    ngOnInit(): void {

        // change proposalCriteria!!!
        this.proposalCriteria = null;
        this.getProposals(this.proposalCriteria);
    }

    constructor(private proposalService: ProposalService) {}

    getProposals(criteria: ProposalCriteria) {

        this.proposalService.getProposals(criteria).then (
            proposals => this.proposals = proposals
        );
    }
}