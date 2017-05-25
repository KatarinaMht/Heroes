import { Alert } from './../shared/models/alert.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Proposal } from '../shared/models/proposal.model';
import { ProposalListComponent } from './components/proposal-list/proposal-list.component';
import { ProposalService } from './../shared/services/proposal.service'


@Component({
  moduleId: module.id,
  selector: 'esl-proposals',
  templateUrl: 'proposals.component.html',
  styleUrls: ['proposals.component.css']
})

export class ProposalsComponent implements OnInit {

  proposalEditId: number;
  public alerts: Array<Alert> = [];
  @ViewChild('proposalList') proposalList: ProposalListComponent;

  ngOnInit(): void {
    console.log("ngOninit proposal");
    this.alerts = [];
    // test
    this.onError("Test error!");
  }

  constructor(private proposalService: ProposalService, private router: Router) { }

  /**
   * Opens Edit Modal
   * 
   * @param Proposal proposal to be edited
   */
  onEditClick(proposal: Proposal) {
    console.log("this.proposalEditId = " + proposal.id);

    this.proposalEditId = proposal.id; 
    
    $('#myModal').on('hide.bs.modal',()=>{
      this.proposalEditId=undefined;
    });

    $('#myModal').modal('show');
    
    //this.router.navigate(['/proposal-edit', proposal.id]);
  }

  /**
   * Deletes proposal.
   */
  onDeleteClick(proposal: Proposal) {
      console.log("2 prop onDeleteClick = " + JSON.stringify(proposal));
      this.proposalService.deleteProposal(proposal).then (
            proposal => {},
            reason => {}
        );
  }

  onEditedProposalSubmitted(proposalUpdated: Proposal) {
    
    if (proposalUpdated) { //if itsn't undefineed
      console.log("reload - proposals.component.ts");
      this.proposalList.reload();
    }

    $('#myModal').modal('hide');
    this.proposalEditId = undefined;
  }

  /**
   * Handles errors from server.
   * 
   * @param string errorMessage to display to user
   */
  onError(errorMessage: string) {
    this.alerts.push(new Alert(Alert.TYPE_DANGER, errorMessage));
  }

}