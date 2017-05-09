import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Proposal } from '../../shared/models/proposal.model';

@Component({
  moduleId: module.id
  selector: 'esl-proposals',
  templateUrl: 'proposals.component.html',
  styleUrls: ['proposals.component.css']
})

export class ProposalsComponent implements OnInit {

    editProposal: Proposal;

    ngOnInit(): void {
      this.editProposal = null;
    }

    constructor(private router: Router) {}

    onEditClick(proposal: Proposal) {
      this.editProposal = proposal;
      this.router.navigate(['/proposal-edit', proposal.id]);
    }
}