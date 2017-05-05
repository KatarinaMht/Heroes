import { Component, OnInit } from '@angular/core';

import { Proposal } from '../../shared/models/proposal.model';

@Component({
  selector: 'esl-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})

export class ProposalsComponent implements OnInit {

    editProposal: Proposal;

    ngOnInit(): void {
      this.editProposal = null;
    }

    constructor() {}

    onEditClick(proposal: Proposal) {
      this.editProposal = proposal;
    }
}