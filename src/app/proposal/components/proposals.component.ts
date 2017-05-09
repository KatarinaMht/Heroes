import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Proposal } from '../../shared/models/proposal.model';
import { Alert } from '../../shared/alert/shared/alert.model';

@Component({
  selector: 'esl-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})

export class ProposalsComponent implements OnInit {

    editProposal: Proposal;
    public alerts: Array<Alert> = [];

    ngOnInit(): void {
      console.log("ngOninit proposal");
      this.editProposal = null;
      this.alerts = [];
      // test
      this.onError("Test error!");
    }

    constructor(private router: Router) {}

    onEditClick(proposal: Proposal) {
      this.editProposal = proposal;
      this.router.navigate(['/proposal-edit', proposal.id]);
    }

    onError(errorMessage: string) {
         this.alerts.push(new Alert(Alert.TYPE_DANGER, errorMessage));
     }
}