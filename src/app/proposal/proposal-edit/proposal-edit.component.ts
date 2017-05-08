import { Component, OnInit } from '@angular/core';

import { Proposal } from '../../shared/models/proposal.model';

@Component({
  selector: 'esl-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css']
})

export class ProposalEditComponent implements OnInit {

    editProposal: Proposal;

    ngOnInit(): void {
      this.editProposal = null;
    }

    constructor() {}
}